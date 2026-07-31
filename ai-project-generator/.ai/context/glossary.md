# Glossary

Terms as used across this repo's docs and code — some are aspirational (not yet backed by code), marked accordingly.

**Generation job** — one request to scaffold a project. Has a `jobId` (`job_xxxxxxxx` format), moves through statuses `QUEUED → (progress %) → READY`. *Currently tracked in-memory, not persisted — see `../memory/known-issues.md` #4.*

**Provider** (AI provider) — a pluggable adapter over one LLM vendor (Gemini, OpenAI, Anthropic, DeepSeek), selected at runtime by `AiProviderFactory`. Conforms to the `AiProvider` interface. *All current implementations return hardcoded text — see `../memory/known-issues.md` #1.*

**Template** — a stack-specific scaffolding source (`templates/spring-boot/`, `templates/nextjs/`, etc.), meant to contain a `template.json` manifest, a `files/` tree with `{{VARIABLE_NAME}}` placeholders, and a README. *No template currently has actual scaffold files — docs only.*

**Modular monolith** — the chosen v1 architecture: one deployable backend, module boundaries enforced by package structure (`controller/service/repository/...` per domain) rather than by splitting into separate services. See `../memory/decisions.md` ADR-001.

**Workspace** — in the "Enterprise" tier concept, a single archive containing multiple related apps (backend/frontend/mobile/infra/docs/tests) rather than one project. Concept only.

**AI agent context** — the `.ai/` (and `.cursor/`, `.claude/`, etc.) directory that both this repo and every *generated* project are meant to ship, so a coding agent can understand the project without re-deriving it. This repo's own `.ai/` is the reference implementation of the pattern.

**Archive** — the packaged output of a generation job (`.zip`, eventually `.rar`/`.7z`/`.tar.gz`), produced by `ArchiveService`.

**Marketplace** — a planned feature where users publish reusable templates for others to generate from with one click. Frontend route exists with mock data; no backend.

**Credits** — the metering unit new users are seeded with (100, on registration) — the spend/consumption model around them isn't defined yet.

**RBAC tier** — one of three route-access levels enforced in `SecurityConfig`: public, user (valid JWT), admin (`ROLE_ADMIN`). See `../standards/api.md`.
