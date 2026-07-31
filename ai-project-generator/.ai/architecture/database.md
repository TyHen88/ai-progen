# Database Architecture

## Stack

PostgreSQL 16, Spring Data JPA / Hibernate 6, Flyway for migrations, HikariCP for pooling.

## Migration workflow

SQL DDL lives under `apps/api/src/main/resources/db/migration/`, versioned `V1__description.sql`, `V2__description.sql`, etc. — never edit an already-applied migration; add a new version. Flyway validates and runs unapplied migrations on startup, before Hibernate initializes.

- **Dev profile** (`application-dev.yml`): `ddl-auto: update` — Hibernate can create/alter tables on top of Flyway, useful for fast local iteration, but means the dev schema can drift from what Flyway actually captures. Reconcile drift back into a migration before merging.
- **Prod profile**: should use `ddl-auto: validate` (schema is 100% Flyway-owned, no runtime alteration) — no `application-prod.yml` exists yet, so this isn't enforced anywhere today.

## Current schema — `V1__init_schema.sql` (the only migration that exists)

| Table | Backed by | Status |
|---|---|---|
| `users` | `UserEntity` | real, seeded with one admin row (`admin@aiprogen.io`) |
| `projects` | `ProjectEntity` | real, full CRUD |
| `templates` | `TemplateEntity` | real entity, no seed data or template content |
| `generation_jobs` | — | table exists but unused; `GeneratorServiceImpl` tracks jobs in an in-memory `ConcurrentHashMap` instead |

## Planned but not migrated

`generated_files`, `downloads`, `prompts`, `ai_providers`, `subscriptions`, `credits`, `organizations`, `workspaces` — named in `../context/business.md` / roadmap discussions, no entity or migration exists. Add these incrementally, one migration per feature, not as a single speculative schema dump.

## Connection pooling

```yaml
spring:
  datasource:
    hikari:
      maximum-pool-size: 10
      minimum-idle: 2
      idle-timeout: 300000
      connection-timeout: 20000
```

## Rules

- Every schema change is a new Flyway migration file, checked in with the code that depends on it — never a manual `ALTER TABLE` against a running dev database that isn't captured in a migration.
- Wire `GeneratorServiceImpl` to persist into `generation_jobs` before adding any more logic on top of the in-memory map — the table already exists and is currently dead weight (`../memory/known-issues.md` #4).
- `packages/shared-types` (once it exists) must mirror these entities — don't let the frontend's `lib/types.ts` drift silently.
