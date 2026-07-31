# Naming Conventions

## Backend (Java)

- Base package: `com.projectgenerator.<module>.<layer>` — e.g. `com.projectgenerator.generator.service.impl`.
- Class suffixes are load-bearing, keep them exact: `Controller`, `Service` (interface), `ServiceImpl`, `Repository`, `Entity`, `Dto`, `Request`/`Response` for request/response DTOs specifically (e.g. `CreateProjectRequest`, `AuthResponse`).
- REST endpoint paths: `/api/v1/<resource-plural-kebab-case>` — e.g. `/api/v1/generator/generate`, `/api/v1/projects/{id}/favorite`.
- Config properties: `<domain>.<property>` lowercase-dot-case in YAML — e.g. `ai.default-provider`, `jwt.access-expiration`.

## Frontend (TypeScript / React)

- Component files: `PascalCase.tsx` matching the exported component name (e.g. `ProjectGeneratorWizard.tsx`).
- Non-component files (hooks, utils, config): `kebab-case.ts` (e.g. `use-mobile.ts`, `admin-data.ts`).
- Hooks: `use-<thing>.ts` exporting `useThing`.
- Route folders under `app/`: kebab-case matching the URL segment; route groups in parens don't affect the URL (`(auth)`, `(dashboard)`).
- Zustand stores / API service files: `<domain>.api.ts`, `<domain>.store.ts` once those layers exist (see `../architecture/frontend.md` — most aren't built yet).

## Database

- Tables and columns: `snake_case`, plural table names (`users`, `generation_jobs`).
- Migration files: `V<n>__<snake_case_description>.sql`, sequential, never reused or edited after being applied.

## Environment variables

- Frontend: `NEXT_PUBLIC_*` prefix for anything exposed to the browser, otherwise unprefixed.
- Backend: uppercase snake case matching the YAML property path (e.g. `JWT_SECRET` for `jwt.secret`).

## Cross-cutting

- A name should describe what a thing *is* or *does* for the person reading it, not how it was implemented. If a name needs a comment to explain it, rename it instead.
