# AGENT.md — apps/

## Purpose
Contains all **runnable applications** in the monorepo. Each app is independently deployable.

## Sub-Applications
| App | Description |
|-----|-------------|
| `web/` | Next.js frontend — user-facing UI |
| `api/` | Spring Boot REST API — core backend |
| `worker/` | Background job worker — async processing |
| `admin/` | Admin panel — internal management UI |

## Agent Guidelines
- Apps must NOT import from each other directly — use `packages/` for shared logic.
- Each app must have its own `package.json` (or `pom.xml` for Java).
- Environment variables must be documented in each app's `.env.example`.
