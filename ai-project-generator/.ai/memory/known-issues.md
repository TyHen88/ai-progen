# Known Issues

Gaps between what the docs describe and what the code actually does, found by direct code inspection (2026-07-31). Check this file before assuming any pipeline described in `../architecture/` or `../context/product.md` is real. Update an entry's status as it's resolved — move resolved items to `changelog.md`, don't just delete them.

## 1 — Generation pipeline is simulated, not real

**Where:** originally `apps/api/.../generator/service/impl/GeneratorServiceImpl.java`; the pipeline itself now lives in `apps/worker`.
**What:** Three `Thread.sleep(1000)` calls fake progress through `ANALYZING_REQUIREMENTS → GENERATING_CODE → COMPLETED`. No AI provider is actually called, no template is rendered, no archive is built.
**Impact:** The product's core feature doesn't exist yet. Don't build new features on top of this pipeline assuming it does real work.
**Status:** resolved (2026-07-31, "Backend: full completion pass") — the pipeline moved entirely out of `apps/api` into a new `apps/worker` service, consuming a Redis Stream (`GenerationJobConsumer` → `GenerationJobProcessor`). It now: calls a real AI provider (Gemini, OpenAI, or Anthropic — all three real, see issue was previously "Gemini only"), renders the actual Spring Boot template (`templates/spring-boot/`) via `TemplateEngine` rather than just wrapping AI text in one file, writes the AI's code as one extra source file plus a `.ai/context.md`, zips it, and attaches the resulting URL to the created project. **Still not the full picture:** only the Spring Boot stack has a real template — the other 6 (`templates/nextjs`, `nestjs`, `flutter`, etc.) are still docs-only, see issue #8. `packages/template-engine` itself stays documentation-only by design — see issue #7's rewritten note on why.

## 2 — Frontend is fully disconnected from the backend

**Where:** `apps/web/lib/mock-data.ts`, referenced throughout `features/`
**What:** Every screen reads from hardcoded TS constants (fake project names, dates, "Connected" API keys). A generic `apiFetch()` client exists in `services/api/client.ts` but nothing calls it.
**Impact:** The UI looks complete but demonstrates nothing about the real backend.
**Status:** open — `../context/roadmap.md` Phase 1.

## 3 — Hardcoded secret fallbacks in a committed config file

**Where:** `apps/api/src/main/resources/application-dev.yml`, `JwtTokenProvider`
**What:** JWT secret and DB password both have inline literal fallback defaults (`@Value("${x:literal}")`).
**Impact:** Acceptable only because no `-prod` profile exists to inherit them. Becomes a real risk the moment a prod profile is added by copying this file.
**Status:** partially resolved (2026-07-31) — `JwtTokenProvider` no longer has a Java-level default (`@Value("${jwt.secret}")`, fails fast if unset); the `application-dev.yml` default was rotated to a new value since the old one had been exposed. **Still open:** the DB password (`DB_PASS:...`) default in the same file is still a real-looking hardcoded literal — left alone deliberately to avoid breaking anyone's local Postgres setup; still must not be reused if/when an `application-prod.yml` is created. See `../standards/security.md`.

## 4 — `generation_jobs` table exists but is unused

**Where:** `V1__init_schema.sql` creates it; `GeneratorServiceImpl` uses an in-memory `ConcurrentHashMap` instead.
**Impact:** Job status doesn't survive an API restart and can't be queried outside the running process.
**Status:** resolved (2026-07-31) — `GeneratorServiceImpl` now persists through `GenerationJobRepository`/`GenerationJobEntity`; the in-memory map is gone.

## 5 — Archive and storage services built but not wired into the pipeline

**Where:** `ZipArchiveServiceImpl`, `LocalStorageServiceImpl` — both real, working code, never invoked by `GeneratorServiceImpl`.
**Impact:** Even a "completed" generation job produces no actual downloadable file today.
**Status:** resolved (2026-07-31) — `GeneratorServiceImpl` now calls both after building the per-job workspace; `ProjectService.updateArchiveUrl` (new, internal-only) attaches the resulting URL to the project. See issue #1 for what "produces a real downloadable file" actually contains right now.

## 6 — `apps/worker` and `apps/admin` have no implementation

**What:** Both are `AGENT.md`-only. The async queue architecture (`../architecture/system.md`) assumes a worker that doesn't exist; the frontend admin UI (`apps/web/app/admin`) has no backend behind it.
**Status:** resolved for the backend halves (2026-07-31). `apps/worker` is now a real, independent Spring Boot service consuming a Redis Stream (`generation-jobs`) — see `../architecture/backend.md`. `apps/admin` itself is still `AGENT.md`-only, but that's correct: its own doc reads as a frontend concern ("internal management interface", "View... in the UI"), not a backend service — the backend counterpart is the new `/api/v1/admin/**` endpoints added to `apps/api` (`AdminController`: paginated users, paginated jobs, stats), already gated by the existing `ROLE_ADMIN` route tier. **Still open:** no frontend consumes these endpoints yet — `apps/web/app/admin` still renders from mock data (issue #2).

## 7 — `packages/*` are documentation only

**What:** None of the 7 planned packages (`sdk`, `shared-types`, `ui`, `ai-provider`, `template-engine`, `archive`, `prompts`) has a `package.json` or source file.
**Impact:** The "apps never import each other, only through packages" rule is currently unenforceable — `apps/web/lib/types.ts` independently redefines shapes that should come from `shared-types` and will drift.
**Status:** partially resolved / reclassified (2026-07-31). Three of the seven — `ai-provider`, `archive`, `template-engine` — were specified as pnpm/TypeScript packages, but the actual implementation is Java, and it now genuinely lives inside `apps/worker` (`provider/`, `archive/`, `templateengine/` packages) where the generation pipeline actually runs. There is no Node service in this monorepo that would ever import a TS version of these, so building empty TS stubs just to match the original doc would be pure busywork — **these three will not become pnpm packages**; treat `apps/worker`'s Java packages as their real home. `sdk`, `shared-types`, `ui`, `prompts` remain genuinely deferred — they only matter once `apps/web` wiring resumes (issue #2), which stayed out of scope for this backend-only pass.

## 8 — `templates/*` have no actual scaffold files

**What:** 5 of 7 `templates/*/PROCESS.md` are one-line stubs; zero files exist under any `templates/<stack>/files/`. The `{{VARIABLE_NAME}}` interpolation convention referenced repeatedly across docs has no template to interpolate into.
**Status:** partially resolved (2026-07-31) — `templates/spring-boot/` now has a real `template.json` manifest and `files/` tree (a small but genuinely buildable Spring Boot skeleton), rendered by `apps/worker`'s `TemplateEngine`. **Still open:** the other 6 stacks (`nextjs`, `nestjs`, `flutter`, `telegram-bot`, `docker`, `github`) remain docs-only stubs.

## 9 — `apps/web/README.md` is leftover boilerplate

**What:** Still references Google AI Studio (`GEMINI_API_KEY`, "view your app in AI Studio") — a leftover from the project's origin, doesn't describe this platform.
**Status:** open — low priority, cosmetic.

## 10 — Backend code review (2026-07-31): High/Medium/Low findings not yet fixed

A full review of `apps/api` (SOLID, duplication, validation, transactions, exception handling, thread safety, Spring Boot best practices) found 31 issues. The 7 Critical ones (global auth bypass, CORS misconfig, hardcoded JWT secret, spoofable user-id header, project IDOR, path traversal on downloads, generation-job IDOR) were fixed in an earlier pass. Several more were resolved as a side effect of the "Backend: full completion pass" (2026-07-31) — worth noting since they weren't targeted deliberately:

- **Resolved as a side effect:** the `@Async` self-invocation bug is gone — `processGenerationAsync` was deleted outright when generation moved to `apps/worker`, not patched in place. The three `AiProvider` impls sharing near-identical structure is fixed — `AbstractRestAiProvider` (in `apps/worker`) now holds the shared scaffolding. The unbounded in-memory job store is gone — jobs live in Postgres. `StorageService.storeArchive` (which "didn't actually store anything") is deleted from `apps/api` entirely — it was dead code once `apps/worker` started writing archive files directly. `ZipArchiveServiceImpl`'s `mkdirs()` return value is now checked (fixed while moving the class to `apps/worker`).
- **Changed in nature, not fixed:** `ZipArchiveServiceImpl`'s output filename (still not sanitized) is no longer "latent" — `apps/worker`'s `GenerationJobProcessor` now genuinely calls it, though the name passed is always the server-generated `jobId`, never raw user input, so it's not currently exploitable the way the finding originally warned. Worth revisiting if that ever changes.
- **Still open, ranked — apps/api:** `GET /api/v1/projects` returns every user's projects unpaged with no scoping to the caller; `GlobalExceptionHandler`'s catch-all leaks raw `ex.getMessage()` to clients (High); duplicated `AuthResponse` construction across 3 call sites, missing `@Size` bounds on several DTOs, broad `catch (Exception)` in `JwtAuthenticationFilter`, hand-duplicated entity→DTO mapping in `ProjectServiceImpl`/`TemplateServiceImpl` (MapStruct is already a dependency), `GlobalExceptionHandler` has no handlers for common Spring MVC exceptions — wrong status codes (Medium); JWT parsed twice per request, unused `refresh-token-expiration` config, inconsistent DI style in `AiProviderFactory` (now moot — that class no longer exists in `apps/api`), redundant `existsById`+`deleteById` round trip, `HealthController` exposes JVM/profile info publicly (Low).
- **Still open — apps/worker (new in this pass, not yet reviewed the way apps/api was):** registration's TOCTOU race doesn't apply here (no registration logic), but the same class of "check-then-act" risk exists in `GenerationJobProcessor`'s idempotency check (`findById` then later `save`) — a genuinely concurrent redelivery within the same short window could still double-process; low real risk given Redis Streams consumer-group semantics mean one message goes to one consumer at a time, but worth a closer look if `apps/worker` is ever scaled to multiple instances. The Redis Streams consumer-group wiring (`RedisStreamConfig`) has not been live-tested against a running Redis — verify manually before relying on it.

**Status:** open — ask for these by severity tier when ready.
