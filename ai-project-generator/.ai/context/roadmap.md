# Roadmap

Ordered by what unblocks the most other work, not by feature glamour. Update the status column as things move — this file should always reflect reality, not intent. Pairs with `../memory/known-issues.md` (the itemized version of "what's wrong") and `../memory/decisions.md` (why things are shaped this way).

## Done

- Auth: register/login/JWT, BCrypt, RBAC route tiers — real, backed by Postgres.
- Project CRUD, with ownership checks — real.
- Web UI shell — 17 routes, feature-first structure, admin panel (most complete area visually) — still on mock data, see Phase 1.
- Security hardening pass (2026-07-31): auth enforced on all routes, CORS allowlist, no hardcoded JWT secret, project/job IDOR fixes, path-traversal fix on downloads.
- Backend: full completion pass (2026-07-31) — the biggest jump so far:
  - `apps/worker` exists as a real, independent Spring Boot service consuming a Redis Stream (`generation-jobs`). `apps/api`'s `GeneratorServiceImpl` now only persists a `QUEUED` job and enqueues it — the entire AI/template/archive pipeline runs in `apps/worker`, off the HTTP request thread, in a separate process.
  - All three AI providers (Gemini, OpenAI, Anthropic) make real HTTP calls — no more canned strings for any of them. Sharing an `AbstractRestAiProvider` base to avoid the duplication the code review flagged.
  - Real multi-file template rendering for the Spring Boot stack (`templates/spring-boot/template.json` + `files/`), via a new `TemplateEngine` in `apps/worker` — not just an AI-text wrapper anymore. The other 6 stacks are still docs-only.
  - `apps/api` gained `/api/v1/admin/**` read endpoints (users, jobs, stats) — the backend half of "admin panel," matching the `ROLE_ADMIN` tier that already existed.
  - `application-prod.yml` added to both `apps/api` and `apps/worker` — no inline secret defaults.
  - See `../memory/known-issues.md` (updated throughout) and `../memory/changelog.md` for exactly what did and didn't change.

## Phase 1 — frontend wiring (the only thing left from the original Phase 1/2 split)

1. Point `apps/web` at the real API — replace `lib/mock-data.ts` reads with `services/api/client.ts` calls, feature by feature, starting with `project` (backend already fully supports it). This now includes wiring the admin UI to the new `/api/v1/admin/**` endpoints instead of its mock data.

## Phase 2 — depth over breadth

1. Remaining templates (NestJS, Flutter, Telegram Bot, Docker, GitHub Actions) — same `TemplateEngine`, more `templates/<stack>/files/` trees.
2. Extract a real shared module for the JPA entities/repositories currently duplicated between `apps/api` and `apps/worker` (`GenerationJobEntity`, `ProjectEntity`) — tracked as a deliberate, flagged tradeoff in `../memory/known-issues.md`, not a silent gap. Needs a root-level multi-project Gradle build first (doesn't exist yet — see `../architecture/system.md`).
3. `packages/shared-types`, `packages/sdk` — deferred until Phase 1 (frontend wiring) actually needs them. `packages/ai-provider`/`archive`/`template-engine` are **not** happening as pnpm packages — see `../memory/known-issues.md` #7 for why.
4. Live-verify the Redis Streams wiring (`RedisStreamConfig`) against a running Redis — built this pass but not tested end-to-end yet.

## Phase 3 — product surface

1. Billing/credits, marketplace backend, multi-format export (RAR/7z/tar.gz/Git push) — all currently frontend-mock or docs-only.
2. Real-time job status (WebSocket/SSE) instead of polling `GET /api/v1/generator/jobs/{jobId}`.

## Explicitly deferred

- Microservices split beyond the `apps/worker` extraction already done — deliberate v1 decision, revisit further splits only if a specific component becomes a scaling bottleneck. See `../memory/decisions.md` ADR-001.
- Enterprise multi-app workspace generation — depends on the single-project pipeline being solid across more than one stack first.
