# Product — Features and Workflow

Source: `/PRD.md`. See `roadmap.md` for what's actually built vs. aspirational.

## User-facing workflow

```
User prompt ("Create a CRM system")
  → AI analyzes requirements → domain entities, architecture, DB, auth inferred
  → Template selected (Spring Boot / Next.js / Flutter / NestJS / Python / ...)
  → Project generated: folder structure, config, source code, docs, Docker, CI/CD, README, sample data
  → Compressed
  → Downloaded
```

## Core features (10, per the PRD)

| # | Feature | What it produces |
|---|---|---|
| 1 | AI Requirement Analyzer | Extracts domain, entities, architecture style, DB, auth from a plain-language prompt |
| 2 | Technology Selector | Backend / frontend / database choice, either explicit or AI-inferred |
| 3 | Architecture Generator | Layered, Clean, Hexagonal, DDD, Microservice, or Modular Monolith |
| 4 | Folder Generator | Stack-appropriate directory structure (controller/service/repository/... etc.) |
| 5 | Documentation Generator | README, architecture.md, api.md, database.md, deployment guide, contribution guide, prompt history |
| 6 | Docker Generator | Dockerfile, docker-compose.yml, Nginx/Redis/Postgres/Adminer as needed |
| 7 | GitHub Generator | `.github/workflows`, CI, release automation, Dependabot |
| 8 | Environment Generator | `.env.example`, per-profile config files |
| 9 | AI Coding Rules Generator | `.ai/`, `.cursor/`, `.claude/`, `.codex/`, Copilot instructions for the *generated* project |
| 10 | ZIP Download | Final packaged archive |

## Advanced input modes (concept only, not built)

- **From image** — Figma/wireframe/screenshot → generated Next.js project.
- **From ERD** — draw.io/dbdiagram/Mermaid/PlantUML → entities, repositories, migrations, DTOs, controllers, API.
- **From OpenAPI spec** — `openapi.yaml` → backend + frontend SDK + Postman collection + Swagger.

## Export formats (concept only)

ZIP (the only one with any implementation — `ArchiveService`/`ZipArchiveServiceImpl`), RAR, 7z, tar.gz, direct push to a Git/GitHub/GitLab/Bitbucket repository.

## AI agent support for generated projects

Every generated project is meant to ship its own `.ai/` directory (`context.md`, `architecture.md`, `coding-guidelines.md`, `tech-stack.md`, `task-list.md`, `roadmap.md`) so an AI coding agent opening the *output* project understands it immediately — the same pattern this repo's own `.ai/` directory follows for itself. Owned conceptually by `packages/template-engine` (not implemented) via `AI Agent Context Injection` into `.ai/` and `.cursor/`.

## Marketplace and enterprise tier

See `business.md` — both are product-vision only, no implementation.
