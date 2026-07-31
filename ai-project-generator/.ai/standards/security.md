# Security Standards

## Authentication

Stateless JWT, HS256, issued by `JwtTokenProvider`. Access token expiry 24h (per `application-dev.yml`; confirm refresh-token handling before relying on it — a 7d refresh expiry is configured but the refresh *endpoint* should be verified in `AuthController` before documenting it as implemented). Passwords hashed with BCrypt (strength 10) via `AuthServiceImpl`. New registrations default to `ROLE_USER` and 100 credits.

## Authorization

Three route tiers enforced in `SecurityConfig` — see `api.md` for the table. `.anyRequest().authenticated()` is the default for anything not explicitly listed (fixed 2026-07-31 — it used to be `permitAll()`, a global auth bypass). `ROLE_ADMIN` is checked in config but no controller currently requires it (no admin backend exists — `../memory/known-issues.md`).

Ownership matters beyond authentication: a valid JWT alone isn't enough for per-resource endpoints. `ProjectService`/`GeneratorService` now verify the resolved principal owns the project/job before returning or mutating it (`../memory/changelog.md`, 2026-07-31) — follow this pattern for any new per-user resource endpoint, don't rely on route-tier auth alone.

## Secrets

`JwtTokenProvider` requires `jwt.secret` with no fallback default (fixed 2026-07-31 — fails fast at boot if unset, rather than silently signing with a value that was sitting in git history). `application-dev.yml` still defines a dev-only default for local convenience; that default was rotated and must never be reused outside `-dev`/`-local`.

**Still a known gap:** the dev datasource password (`DB_PASS` default in `application-dev.yml`) is still a hardcoded literal — left alone deliberately so it doesn't break anyone's local Postgres setup, but must not be copied into a prod profile (`../memory/known-issues.md` #3).

**Rule going forward:**
- Never add a literal secret as a `@Value` fallback outside a `-dev`/`-local` profile.
- When an `application-prod.yml` is created, every secret must come from an environment variable or secret manager with **no inline default** — a missing prod secret should fail startup loudly, not silently fall back to a dev value.
- Don't commit real API keys for AI providers, storage, or anything else — `.env.example` / YAML placeholders only.

## AI provider keys

Configured per-provider under `ai.<provider>.api-key` in YAML. `GeminiAiProvider`'s key currently defaults to the literal `"mock-key"` — expected for now since the provider doesn't make a real call yet (`../memory/known-issues.md` #1), but this default must be removed the moment the provider is wired to a real API, for the same reason as above.

## Input validation

Validate at the boundary: DTOs via `jakarta.validation` on the backend, Zod schemas on the frontend. Don't re-validate the same input deeper in the call stack — trust a DTO that already passed `@Valid`.

## CORS

Configured via `cors.allowed-origins` in YAML (comma-separated), read by `SecurityConfig` — defaults to `http://localhost:3000` (the Next.js dev server). Fixed 2026-07-31: was `AllowedOriginPatterns("*")` combined with `allowCredentials(true)`, which Spring does not reject and which reflects any caller's `Origin` back, defeating the allowlist entirely. Add new deployed frontend origins to this list explicitly — never reintroduce a wildcard pattern alongside credentials.
