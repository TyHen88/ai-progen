# System Architecture

## Shape

Modular monolith, not microservices, for v1 (`../memory/decisions.md`, ADR-001). One deployable API, one deployable web app, module boundaries enforced by package structure rather than network calls. Split into services later if load demands it.

## Monorepo layout

```
apps/
├── web/        Next.js frontend                    — built, see frontend.md — still on mock data
├── api/        Spring Boot backend                 — built, see backend.md
├── worker/     Spring Boot background job processor — built, see worker.md (added 2026-07-31)
└── admin/      internal admin UI                    — not started (apps/web/app/admin is a frontend-only mock; backend half is apps/api's admin/ package)

packages/
├── sdk/              generated API client            — not started, deferred until apps/web wiring resumes
├── shared-types/     cross-app DTOs                    — not started, same
├── ui/                shared React components           — not started
├── prompts/            AI prompt templates                — not started
├── template-engine/     —                                 — will not be built as a pnpm package; real implementation is apps/worker's templateengine/ (Java) — see known-issues.md #7
├── archive/               —                                 — same story, real implementation is apps/worker's archive/
└── ai-provider/            —                                 — same story, real implementation is apps/worker's provider/

templates/
├── spring-boot/     template.json + files/            — real, rendered by apps/worker's TemplateEngine
└── (6 others)         docs only                          — not started
```

**Rule:** apps never import from each other directly. `apps/web` talks to `apps/api` only through `packages/sdk`; shared types live in `packages/shared-types`, not duplicated per app. Still unenforceable for the frontend side (`packages/sdk`/`shared-types` don't exist yet). On the backend side, `apps/api` and `apps/worker` are two independent Gradle projects with **no shared module** either — they duplicate the JPA entities they both need (`GenerationJobEntity`, `ProjectEntity`) rather than import from one another, a deliberate, tracked tradeoff (`../memory/known-issues.md`) until a root-level multi-project Gradle build exists to hang a shared module off.

## Request flow (current, as of 2026-07-31)

```
User → Web UI (Next.js, still on mock data)
     → apps/api
         ├─→ Project Service          (CRUD — real, ownership-checked)
         ├─→ Admin Service            (read-only, ROLE_ADMIN — real)
         └─→ Generator Service        (persists a QUEUED job, XADDs to Redis stream `generation-jobs`, returns)
                                            │
                                            ▼
     apps/worker  ← consumes the stream via a consumer group (GenerationJobConsumer)
         └─→ GenerationJobProcessor
              ├─→ AiProviderFactory → Gemini / OpenAI / Anthropic   (all real HTTP calls)
              ├─→ TemplateEngine → templates/spring-boot/files/      (real, one stack)
              ├─→ ArchiveService → zip                                (real)
              └─→ writes the Project row (archiveUrl set) + marks the job COMPLETED
     apps/api → StorageController serves the finished zip for download
```

Not live-tested end-to-end yet — see `worker.md`'s "Not live-tested" section before assuming this runs cleanly against a real Redis.

## Cross-cutting concerns

| Concern | Home |
|---|---|
| Auth / JWT / RBAC | `apps/api/.../security/`, see `../standards/security.md` |
| AI provider abstraction | `apps/worker/.../provider/` (moved from `apps/api` 2026-07-31) |
| Archiving | `apps/worker/.../archive/` (moved from `apps/api` 2026-07-31) |
| Template rendering | `apps/worker/.../templateengine/` (new 2026-07-31) |
| Object storage (write) | `apps/worker` writes directly to the shared `storage.archive-output-dir` |
| Object storage (read/download) | `apps/api/.../storage/` — `StorageService.loadArchiveAsResource` only now |
| Async job queue | Redis Stream `generation-jobs`, producer in `apps/api`, consumer in `apps/worker` |
