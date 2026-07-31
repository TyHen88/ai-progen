# AGENT.md — packages/shared-types

## Purpose
**Shared DTOs and Types** — TypeScript interfaces and types shared between the frontend, SDK, and any TypeScript-based packages.

## Responsibilities
- Define request/response DTOs
- Define domain model interfaces
- Define enums and constants
- Provide Zod schemas for runtime validation

## Agent Guidelines
- Types here must mirror the Java/Kotlin DTOs in `apps/api`.
- Keep this package **pure TypeScript** — no runtime dependencies beyond `zod`.
- Changes here may require updates to both frontend and SDK packages.
