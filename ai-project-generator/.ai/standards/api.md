# API Conventions — apps/api

## Base path and versioning

All endpoints under `/api/v1/`. Breaking changes get a new version prefix (`/api/v2/`) rather than mutating `v1` in place — no `v2` exists yet, so this is untested in practice but is the intended path.

## Response envelope

Every endpoint returns `ApiResponse<T>` (`common/response/ApiResponse.java`) — don't return a bare entity or DTO from a controller. Errors are translated centrally by `GlobalExceptionHandler` (`common/exception/`); controllers should let exceptions propagate rather than catching and reformatting them locally.

## Auth

`Authorization: Bearer <JWT>` header on every protected request. Three route tiers, enforced in `configuration/SecurityConfig.java`:

| Tier | Routes | Requirement |
|---|---|---|
| Public | `/api/v1/auth/**`, `/api/v1/health`, `/swagger-ui.html`, `/v3/api-docs` | none |
| User | `/api/v1/projects/**`, `/api/v1/generator/**` | valid JWT |
| Admin | `/api/v1/admin/**` | valid JWT + `ROLE_ADMIN` (no admin controllers exist yet — see `../memory/known-issues.md`) |

See `security.md` for token details.

## Existing endpoints (ground truth, not aspirational)

| Method | Path | Module |
|---|---|---|
| POST | `/api/v1/auth/login` | auth |
| POST | `/api/v1/auth/register` | auth |
| GET | `/api/v1/auth/me` | auth |
| GET / POST | `/api/v1/projects` | project |
| GET / PATCH / DELETE | `/api/v1/projects/{id}` | project |
| PATCH | `/api/v1/projects/{id}/favorite` | project |
| POST | `/api/v1/generator/generate` | generator (simulated, see `../memory/known-issues.md`) |
| GET | `/api/v1/generator/jobs/{jobId}` | generator |
| GET | `/api/v1/health` | health |

Template and storage endpoints exist as controllers (`TemplateController`, `StorageController`) — confirm current paths in source before documenting them here as stable; this table should stay in sync with what's actually implemented, not what's planned.

## Documentation

Swagger UI is live at `/swagger-ui.html` when the API is running (`springdoc-openapi`) — treat it as the current source of truth for exact request/response shapes, this file as the source of truth for conventions.

## Adding an endpoint

1. DTO in `<module>/dto/` with `jakarta.validation` annotations.
2. Controller method returns `ApiResponse<YourDto>`, validates with `@Valid`.
3. Business logic in `service/impl/`, never in the controller.
4. Update this table.
