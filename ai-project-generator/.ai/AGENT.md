# AGENT.md — .ai/ (root)

## Purpose

Global AI agent context and configuration for the **AI Project Generator** platform. Every file under `.ai/` exists so a coding agent can understand this repository without re-deriving it from scratch each session. This file is the index — read it first, then follow it to the file that actually answers your question.

## Overview

This repository is an AI Project Generator platform: users describe a project in natural language, the platform picks a stack and architecture, scaffolds the code, docs, Docker, and CI, then packages it as a downloadable archive. See `context/product.md` for the full feature set and `context/business.md` for the underlying pitch.

The repo is a modular-monolith-plus-one-worker monorepo. It is **actively being built, not fully implemented** — `apps/api` and `apps/worker` together have a real, working generation pipeline (one template stack, three real AI providers) as of 2026-07-31, `apps/web` has a built UI shell but is still on mock data. See `memory/known-issues.md` before assuming any specific piece works end-to-end.

## Structure

```
.ai/
├── AGENT.md               this file — global rules and index
├── PROCESS.md              required development workflow
│
├── agents/AGENT.md         AI agent roles and behavior rules
├── prompts/AGENT.md        prompt-authoring guidelines
├── tasks/AGENT.md          task lifecycle and tracking format
│
├── architecture/           how the system is actually built
│   ├── system.md            monorepo layout, request flow, module map
│   ├── backend.md           Spring Boot module structure and conventions (apps/api)
│   ├── worker.md              Spring Boot job worker, Redis Streams, template rendering (apps/worker)
│   ├── frontend.md          Next.js structure and conventions
│   └── database.md          schema, migrations, connection pooling
│
├── standards/               conventions every agent must follow
│   ├── coding.md             backend + frontend code style
│   ├── naming.md              file, class, route, and DB naming
│   ├── commit.md               commit message format
│   ├── api.md                   REST conventions, response envelope, errors
│   └── security.md              auth, secrets, RBAC rules
│
├── context/                 why the product exists and where it's going
│   ├── business.md           the pitch, audience, business model
│   ├── product.md              core features and user-facing workflow
│   ├── roadmap.md               what's built vs. next, in priority order
│   └── glossary.md              domain terms used across the docs
│
├── templates/                copy-paste starting points
│   ├── task-template.md
│   ├── feature-template.md
│   ├── pr-template.md
│   └── prompt-template.md
│
└── memory/                   long-lived knowledge that outlives any one session
    ├── decisions.md            ADR-style log of why things are the way they are
    ├── known-issues.md          gaps between the docs and the actual code
    └── changelog.md              dated log of notable milestones
```

Every other directory in the repo (`apps/*`, `packages/*`, `templates/*`, `docs/*`, ...) keeps its own local `AGENT.md` for directory-specific rules — `.ai/` holds the cross-cutting rules that apply everywhere.

## Before implementing anything

1. Read `PROCESS.md` — the required workflow, no steps skipped.
2. Read `context/roadmap.md` and `memory/known-issues.md` — confirm the area you're touching is actually real and not simulated.
3. Read the relevant `architecture/*.md` for the layer you're changing.
4. Read `standards/coding.md`, `standards/naming.md`, and (if touching an endpoint) `standards/api.md`.
5. If a task file exists for this work, read it; otherwise start from `templates/task-template.md`.

Never invent a folder structure, naming scheme, or API shape that isn't already established in `architecture/` or `standards/` — extend the existing convention instead.

## Technology stack

| Layer | Stack | Detail |
|---|---|---|
| Frontend | Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4 | `architecture/frontend.md` |
| Backend | Spring Boot 3.4, Java 17, Spring Security, Spring Data JPA | `architecture/backend.md` |
| Worker | Spring Boot 3.4, Java 17, no web layer — Redis Streams consumer | `architecture/worker.md` |
| Database | PostgreSQL 16, Flyway, HikariCP | `architecture/database.md` |
| AI | Provider-abstracted: Gemini, OpenAI, Anthropic all real (`apps/worker`) | `architecture/worker.md`, `memory/known-issues.md` |
| Infrastructure | Docker, Redis (real queue, not just cache) | `infrastructure/AGENT.md` |

## Global rules

- **Modular monolith plus one worker, not full microservices** — see `memory/decisions.md` (ADR-001, ADR-005) for why.
- **Apps never import each other directly** — shared logic goes through `packages/` on the frontend side. On the backend side, `apps/api` and `apps/worker` are separate Gradle projects with no shared module yet, so they deliberately duplicate the JPA entities they both need rather than reach into each other — see `architecture/system.md` and `memory/known-issues.md`.
- Feature-first, domain-driven modules on both frontend and backend; keep business logic out of controllers/route handlers.
- Strongly typed code everywhere — TypeScript strict mode, no raw `any`; Java DTOs validated with `jakarta.validation`.
- Prefer composition over inheritance; use dependency injection; never duplicate code that already exists in a shared module.
- Follow existing conventions over introducing new ones — if something is genuinely missing, add it to `standards/` rather than deciding it ad hoc per file.
