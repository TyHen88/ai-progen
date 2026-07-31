# AGENT.md — packages/

## Purpose
Contains all **shared libraries and utilities** used across the monorepo applications. These are internal packages managed by pnpm workspaces.

## Packages
| Package | Description |
|---------|-------------|
| `ui/` | Shared React UI component library |
| `sdk/` | Auto-generated API client SDK |
| `shared-types/` | Shared TypeScript DTOs and interfaces |
| `prompts/` | AI prompt templates |
| `template-engine/` | Project template rendering engine |
| `archive/` | ZIP/RAR/7z archive utilities |
| `ai-provider/` | AI provider abstraction layer |

## Agent Guidelines
- Packages must be **framework-agnostic** where possible.
- All packages must export a clear, documented public API.
- Breaking changes to packages require updating all consuming apps.
- Each package must have its own `package.json` with a `name` matching `@aiprogen/<package-name>`.
