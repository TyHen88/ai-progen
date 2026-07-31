# AGENT.md — ai-project-generator (Root)

## Project Overview
This is the **AI Project Generator** monorepo — a platform that uses AI to scaffold, generate, and export full-stack project templates based on user input.

## Monorepo Layout
| Directory | Purpose |
|-----------|---------|
| `apps/` | Runnable applications (frontend, backend, workers) |
| `packages/` | Shared libraries and utilities |
| `templates/` | Project scaffolding templates |
| `generated/` | Temporary output from project generation |
| `storage/` | File storage (uploads, archives, cache) |
| `docs/` | Documentation |
| `infrastructure/` | DevOps and deployment configs |
| `.github/` | CI/CD workflows and issue templates |
| `.ai/` | AI context, rules, and agent configs |

## Tech Stack
- **Frontend**: Next.js (TypeScript)
- **Backend**: Spring Boot (Java/Kotlin)
- **Worker**: Background job service
- **Package Manager**: pnpm (workspaces)
- **Containerization**: Docker / Docker Compose

## Agent Guidelines
- Follow monorepo conventions; keep cross-package imports through `packages/` only.
- Do not commit generated artifacts in `generated/` to version control.
- All AI-related logic should live in `packages/ai-provider` or `packages/prompts`.
