# Worker Architecture — apps/worker

Added 2026-07-31. Real, independent Spring Boot service — not a stub, not a subproject of `apps/api`.

## Stack

Spring Boot 3.4.2, Java 17 — same versions as `apps/api`, but **no `spring-boot-starter-web`**: this process has no REST layer, only a Redis Streams consumer. Dependencies: `spring-boot-starter-data-jpa` + `postgresql` (reads/writes the same tables `apps/api` owns), `spring-boot-starter-data-redis` (the queue), plain `spring-web` (just for `RestClient`, used by the AI providers), `commons-compress`/`commons-io` (zip), Lombok.

Own Gradle wrapper, own `build.gradle.kts`/`settings.gradle.kts` (`rootProject.name = "ai-project-generator-worker"`). There is no root-level multi-project Gradle build anywhere in this repo — `apps/api` and `apps/worker` are two fully separate, independently buildable/deployable projects, matching what `apps/AGENT.md` already said each app should be.

## Why this exists

`apps/api`'s `GeneratorServiceImpl` used to do the whole AI-generation pipeline synchronously, in the HTTP request thread, via a broken `@Async` self-invocation. `apps/worker` is where that pipeline actually lives now — `apps/api` only enqueues.

## Package layout

Root package `com.projectgenerator.worker`:

```
generator/entity/, generator/repository/    GenerationJobEntity — duplicated from apps/api (see below)
project/entity/, project/repository/          ProjectEntity — duplicated, write-only (no DTOs/mappers/ownership checks needed here)
provider/                                       AiProvider, AiProviderFactory, AiProviderException
provider/impl/                                    AbstractRestAiProvider + Gemini/OpenAi/Anthropic
archive/                                         ArchiveService, ZipArchiveServiceImpl — moved here from apps/api
templateengine/                                   TemplateEngine — new, renders templates/<stack>/files/
queue/                                            GenerationJobPayload, GenerationJobProcessor, GenerationJobConsumer, RedisStreamConfig
```

## Data access — deliberate duplication

`GenerationJobEntity`/`GenerationJobRepository` and `ProjectEntity`/`ProjectRepository` exist in both `apps/api` and `apps/worker`, pointing at the same Postgres tables. This is not an oversight — there's no shared Gradle module to hang a common entity definition off (see Stack above), and building one is its own separate refactor (`../context/roadmap.md` Phase 2). `apps/api` owns the schema via Flyway; `apps/worker`'s copies use `ddl-auto: none` and must never attempt to create/alter tables, only read/write rows.

## The pipeline (`GenerationJobProcessor`)

1. `GenerationJobConsumer` (a `StreamListener`) reads from the `generation-jobs` Redis stream via a consumer group (`RedisStreamConfig`), one message at a time, manually acking after processing.
2. `GenerationJobProcessor.process()`: reload the job row first — **if it's already `COMPLETED`/`FAILED`, skip and ack** (the idempotency guard `apps/worker/AGENT.md` requires, so a redelivered message is a safe no-op).
3. Call `AiProviderFactory.getProvider(null)` (default provider, from `ai.default-provider`) for a requirements analysis, then generated code.
4. `TemplateEngine.render(...)` the Spring Boot template into a per-job workspace (`generated/<jobId>/`, same convention as before), then write the AI's code as one extra file under `.../generated/GeneratedFeature.java`, plus a `.ai/context.md` with the AI's analysis.
5. `ArchiveService.createZipArchive(...)`, write the project row (`ProjectRepository`, with `archiveUrl` already set — unlike the old `apps/api` flow, there's no separate "attach URL after the fact" step here), mark the job `COMPLETED`.
6. `finally`: delete the workspace directory regardless of outcome.

Status vocabulary is unchanged from when this lived in `apps/api`: `QUEUED → PROCESSING → ANALYZING_REQUIREMENTS(40%) → GENERATING_CODE(75%) → COMPLETED(100%)/FAILED` — not the `PENDING/RUNNING/DONE/FAILED` prose in `apps/worker/AGENT.md`, to avoid breaking the existing contract.

## Templates

Only `templates/spring-boot/` has a real `files/` tree so far (see `templates/AGENT.md` and `packages/template-engine/PROCESS.md` for the convention). `TemplateEngine` reads from `${templates.root-dir:../../templates}` — relative to `apps/worker`'s own working directory when run via `bootRun`, two levels up to the monorepo root. Override with an absolute path in any deployment where that assumption doesn't hold (e.g. a container image that doesn't preserve the monorepo layout).

## Not live-tested

The Redis Streams consumer-group wiring (`RedisStreamConfig`) compiles but hasn't been exercised against a running Redis in this pass. Verify manually: `docker-compose up -d` (Postgres+Redis), `bootRun` both `apps/api` and `apps/worker`, submit a generation request, confirm the job reaches `COMPLETED` and the resulting zip is downloadable.

## Build / verify

```
cd apps/worker && ./gradlew.bat compileJava
```
