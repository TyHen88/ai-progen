# Decisions

ADR-style log — short, dated, append-only. Never delete an old entry; mark it Superseded and link forward instead.

---

## ADR-001 — Modular monolith over microservices for v1

**Status:** Accepted
**Context:** Source: `/TECHSTACK&DEICION.md`. The platform will eventually need auth, billing, templates, marketplace, user management, background jobs, and multiple AI provider integrations.
**Decision:** Build as a single Spring Boot deployable with module boundaries enforced by package structure, not a microservices split.
**Consequences:** Faster to build and test now; module boundaries (`auth`, `project`, `generator`, `provider`, ...) must stay clean so any module can be extracted into its own service later without a redesign. Revisit only if a specific component (most likely AI generation workers) becomes a genuine scaling bottleneck.

## ADR-002 — Next.js + Spring Boot as the core stack

**Status:** Accepted
**Context:** Frontend needs a fast dashboard/marketing experience; backend needs to support auth, billing, and long-running AI orchestration reliably.
**Decision:** Next.js 15 (App Router) for `apps/web`, Spring Boot 3.4 (Java 17) for `apps/api`.
**Consequences:** Two different language ecosystems in one monorepo — `packages/shared-types` is required to keep DTOs in sync rather than duplicated (not yet built, see `known-issues.md` #7).

## ADR-003 — Object storage for archives, not database blobs

**Status:** Accepted
**Context:** Generated project archives can be large; storing binary blobs in Postgres doesn't scale.
**Decision:** Store only metadata in Postgres; archive files live in object storage (local disk in dev, S3/MinIO/Cloudflare R2 planned for production) via `StorageService`.
**Consequences:** `StorageService`/`LocalStorageServiceImpl` exist and work, but aren't yet called from the generator pipeline (`known-issues.md` #5).

## ADR-004 — Stateless JWT auth over session-based

**Status:** Accepted
**Context:** API needs to scale horizontally without sticky sessions.
**Decision:** JWT (HS256) issued on login, validated per-request by `JwtAuthenticationFilter`, no server-side session store.
**Consequences:** Token revocation before expiry isn't possible without an added blocklist — not needed yet at current scale, revisit if/when it becomes a requirement.

## ADR-005 — Async job queue deferred; generation currently synchronous

**Status:** Accepted (temporary)
**Context:** The full architecture calls for `apps/worker` consuming a Redis/RabbitMQ queue so generation doesn't block an HTTP request.
**Decision:** Ship `GeneratorController`/`GeneratorServiceImpl` first against a synchronous, in-request implementation to prove the API shape, with the explicit understanding that it's a placeholder.
**Consequences:** The placeholder simulates work with `Thread.sleep` and fake AI responses instead of doing real work — this is tracked as tech debt in `known-issues.md` #1, not treated as done. `apps/worker` must be built before this can handle real (non-instant) generation load.

---

Add new entries above this line, newest at the bottom of the numbered sequence.
