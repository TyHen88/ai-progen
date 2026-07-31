# Coding Standards

## General (both stacks)

- Never duplicate code that already exists in a shared module — extend it or extract a shared helper instead.
- Prefer composition over inheritance; use dependency injection rather than static singletons or manual `new`.
- Keep business logic out of controllers/route handlers — they validate input and delegate, nothing else.
- Keep UI components reusable and side-effect-free where possible; push data-fetching and state to hooks/services.
- Write strongly typed code — no untyped `any` (frontend) or raw `Object`/unchecked casts (backend) without a comment explaining why.
- Match the existing convention in the file/module you're editing over introducing a new one. If the existing convention is genuinely wrong, fix it in `standards/` first, then apply it.
- Don't add error handling, fallbacks, or config toggles for scenarios that can't happen — validate at system boundaries (API input, external calls), trust internal code.
- No simulated/faked implementations presented as real — if a dependency isn't ready, leave the method unimplemented (or `TODO` with a linked entry in `../memory/known-issues.md`) rather than hardcoding a plausible-looking response. This project already has one instance of that pattern (`GeneratorServiceImpl`, `../memory/known-issues.md` #1) — don't add a second.

## Backend (Spring Boot / Java)

- Layering is fixed: `controller/ → service/ (interface) → service/impl/ → repository/`. Don't skip a layer or put JPA queries in a controller.
- DTOs validated with `jakarta.validation` annotations; entities never leave the service layer directly — map to a DTO (MapStruct where a mapping is non-trivial, plain constructors where it's a one-liner).
- All responses wrapped in `ApiResponse<T>` (`../standards/api.md`); all exceptions handled by `GlobalExceptionHandler` — no per-controller try/catch that reformats an error.
- New AI providers implement `AiProvider` and register with `AiProviderFactory` — never call a vendor SDK directly from a service class.
- Use constructor injection (Lombok `@RequiredArgsConstructor`), not field injection.

## Frontend (Next.js / TypeScript)

- App Router only — no `pages/` directory additions.
- Feature-first: a feature's components, hooks, and API calls live together under `features/<domain>/`; only genuinely cross-feature UI belongs in `components/`.
- Presentational components (`components/ui`) take props and render — no `fetch`, no global state access, no side effects.
- Forms use React Hook Form + Zod; don't hand-roll validation.
- Don't add a new mock-data constant to `lib/mock-data.ts` — see `../architecture/frontend.md` for why, and wire to the real API client (`services/api/client.ts`) instead wherever the backend endpoint already exists.

## Before submitting a change

Run the relevant build/verify command from `../architecture/backend.md` or `../architecture/frontend.md` — don't hand this off unverified.
