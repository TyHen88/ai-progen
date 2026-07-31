# Backend Architecture — apps/api

## Stack

Spring Boot 3.4.2, Java 17, Gradle (Kotlin DSL: `build.gradle.kts`). PostgreSQL via Spring Data JPA + Flyway. Spring Security 6 with stateless JWT (jjwt 0.12.6). Redis for cache. springdoc-openapi for Swagger UI. Lombok + MapStruct for boilerplate/mapping.

## Package layout

Root package: `com.projectgenerator`. Each domain module follows the same internal layering:

```
<module>/
├── controller/    @RestController, request validation only
├── service/         interface
├── service/impl/       implementation — business logic lives here
├── repository/           Spring Data JPA interfaces
├── entity/                 @Entity classes
└── dto/                     request/response DTOs, validated with jakarta.validation
```

## Modules and current status

| Module | Contents | Status |
|---|---|---|
| `auth` | login, register, `AuthController`, `AuthServiceImpl` | real — BCrypt + JWT, works against Postgres |
| `user` | `UserEntity`, `UserRepository` | real |
| `project` | full CRUD, `ProjectController` | real |
| `template` | entity + repository + controller | real CRUD, no template *content* wired to it |
| `generator` | `GeneratorController`, `GeneratorServiceImpl`, `GenerationJobEntity`, `GenerationJobRepository` | real, but thin as of 2026-07-31 — persists a `QUEUED` job and `XADD`s it to the `generation-jobs` Redis stream, then returns. The actual pipeline (AI call, template render, archive, storage) moved entirely to `apps/worker` — see `worker.md` |
| `admin` | `AdminController`, `AdminService`/`Impl` | real — read-only, `ROLE_ADMIN`-gated (`/api/v1/admin/users`, `/jobs`, `/stats`); no frontend consumes it yet |
| `storage` | `StorageService`, `LocalStorageServiceImpl` | real, read-only from this side (`loadArchiveAsResource` for downloads) — `apps/worker` writes archive files directly to the same shared directory |
| `security` | `JwtTokenProvider`, `JwtAuthenticationFilter`, `UserPrincipal`, `CustomUserDetailsService` | real |
| `common` | `ApiResponse<T>`, `PageResponse<T>`, `BusinessException`, `GlobalExceptionHandler` | real, see `../standards/api.md` |
| `configuration` | `SecurityConfig`, `SwaggerConfig` | real |
| `health` | `HealthController` | real |

`provider/` and `archive/` packages that used to live here **moved to `apps/worker` entirely** (2026-07-31) — nothing in `apps/api` calls an AI provider or builds a zip anymore. If you're looking for `AiProviderFactory`/`ArchiveService`, they're in `worker.md` now.

## Conventions

- Controllers validate with `@Valid` and delegate immediately — no business logic in the controller layer.
- Every endpoint returns the request through `ApiResponse<T>` (see `../standards/api.md`); exceptions are translated centrally by `GlobalExceptionHandler`, never caught-and-formatted per controller.
- Anything that should run off the request thread goes through the `generation-jobs` Redis stream to `apps/worker`, not `@Async` inside `apps/api` — the previous `@Async` self-invocation bug is exactly why (`../memory/known-issues.md` #10).

## Configuration profiles

- `application.yml` — base config, port 8080, Jackson, springdoc paths.
- `application-dev.yml` — active by default; local Postgres (`creator_copilot` db), Hibernate `ddl-auto: update`, local Redis, hardcoded JWT-secret and DB-password *fallback* values (`@Value("${x:default}")`). These fallbacks are dev-only — do not let them leak into a prod profile. See `../standards/security.md` and `../memory/known-issues.md` (#3).
- `application-prod.yml` (added 2026-07-31) — `ddl-auto: validate`, `JWT_SECRET`/`DB_PASS` required with no inline default (boot fails without them), stack traces never included in error responses.

## Build / verify

```
cd apps/api && .\gradlew.bat compileJava
```
No test suite currently exercises the generator pipeline — `spring-boot-starter-test`, `spring-security-test`, and Testcontainers are on the classpath but largely unused so far.
