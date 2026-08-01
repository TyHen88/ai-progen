# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository state: scaffold only, no code yet

This repository currently contains **only planning/documentation files** — there is no `package.json`, `pom.xml`, `pnpm-workspace.yaml`, source code, or build tooling anywhere in the tree yet. Every directory under `ai-project-generator/` exists solely as an empty folder holding a single `AGENTS.md` that describes what will eventually live there.

**Practical implications:**
- There are no build, lint, or test commands to run — none exist yet. Do not invent or assume commands (e.g. `pnpm build`, `mvn test`) are wired up; check for the relevant config file before relying on any tooling.
- When asked to implement a feature, you are usually starting from zero for that area — check the directory's `AGENTS.md` for the intended design first, then create the actual `package.json`/`pom.xml`/source files following that design.
- `structure.md` (repo root) is the target directory layout the whole tree is being built toward.

## Directory-level `AGENTS.md` convention — read before working in a folder

This repo uses a convention where **almost every directory has its own `AGENTS.md`** describing that directory's purpose, responsibilities, and rules. These are the source of truth for that area and are more specific than this file. Before creating or editing files in any subdirectory, read its local `AGENTS.md` (and its parent's, if the subdirectory doesn't have one yet).

Root guidance lives in `ai-project-generator/AGENTS.md`.

When you scaffold a new subdirectory that doesn't have code yet, follow the design already documented in its `AGENTS.md` rather than improvising a different structure — the AGENTS.md files across the tree already form a consistent plan (tech choices, naming, cross-package rules).

## Project overview

**AI Project Generator** — a monorepo for a platform that uses AI to scaffold, generate, and export full-stack project templates (Spring Boot, Next.js, NestJS, Flutter, Telegram bots, etc.) based on user input.

Planned tech stack (per `ai-project-generator/AGENT.md`):
- **Frontend** (`apps/web`): Next.js 14+ (App Router), TypeScript, Tailwind CSS
- **Backend** (`apps/api`): Spring Boot 3+ (Java/Kotlin), PostgreSQL via JPA/Hibernate, Spring Security + JWT
- **Worker** (`apps/worker`): background job processor consuming from Redis/RabbitMQ
- **Admin** (`apps/admin`): internal-only management UI
- **Package manager**: pnpm workspaces for the JS/TS packages
- **Containerization**: Docker / Docker Compose, with Kubernetes manifests for production

## Architecture (as planned)

The generation pipeline flows across apps and packages like this:

1. `apps/web` collects user input (template choice + variables) and calls the backend only through `packages/sdk` (never directly).
2. `apps/api` accepts the request, orchestrates AI calls through `packages/ai-provider` (a provider-agnostic abstraction over OpenAI/Claude/Gemini/etc.) using prompt templates from `packages/prompts`, and enqueues the actual generation work for `apps/worker`.
3. `apps/worker` renders the chosen `templates/<type>/` scaffold via `packages/template-engine`, writes output to `generated/<job-id>/` (ephemeral, gitignored), and packages it into an archive via `packages/archive`.
4. Finished archives move to `storage/archives/`; job status is tracked back through the API for `apps/web` to poll/display.

Key architectural rules to preserve:
- **Apps never import from each other directly** — shared logic must go through `packages/`.
- **`packages/sdk` is auto-generated** from the API's OpenAPI spec — don't hand-edit generated files; put manual additions in a separate `src/extensions/` directory within it.
- **`packages/shared-types` must mirror the Java/Kotlin DTOs** defined in `apps/api` — changes to backend DTOs should be reflected here, which in turn affects `apps/web` and `packages/sdk`.
- **Templates use a manifest format** (`template.json` + `files/` + `README.md`) with `{{VARIABLE_NAME}}` interpolation placeholders — see `templates/AGENT.md` and the individual `templates/<type>/AGENT.md` for each stack's specific variables.
- **`generated/`** is purely ephemeral working space (one UUID subdirectory per job, cleaned up after archiving) — never treat it as persistent storage or commit its contents.
- **AI-related logic belongs in `packages/ai-provider` or `packages/prompts`** — don't scatter provider-specific calls elsewhere.

## Monorepo layout

| Directory | Purpose |
|-----------|---------|
| `apps/web`, `apps/api`, `apps/worker`, `apps/admin` | Runnable applications |
| `packages/ui`, `sdk`, `shared-types`, `prompts`, `template-engine`, `archive`, `ai-provider` | Shared libraries, one per concern |
| `templates/` | Scaffolding source for each generatable project type |
| `generated/` | Ephemeral per-job output (gitignored) |
| `storage/uploads`, `storage/archives`, `storage/cache` | File storage (local/dev; cloud storage in production) |
| `docs/` | Architecture, API, database, deployment, AI, roadmap docs, and ADRs (`docs/decisions/`) |
| `infrastructure/` | Docker, Kubernetes, Nginx, monitoring, and operational scripts |
| `.ai/` | AI agent context/config for development itself (`context.md`, `architecture.md`, `coding-rules.md`, `tasks/`, `prompts/`, `agents/`) — check this if present before AI-assisted work |
| `.github/` | CI/CD workflows and issue/PR templates |
