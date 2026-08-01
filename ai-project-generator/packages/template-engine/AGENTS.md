# AGENTS.md — packages/template-engine

## Purpose
**Template Rendering Engine** — Processes project templates and renders them with user-provided variables and AI-generated content.

## Responsibilities
- Parse and validate project template structures
- Interpolate variables into template files
- Support conditional file inclusion
- Handle nested directory structures
- Output rendered project file trees

## Agent Guidelines
- Templates use a defined manifest format (e.g., `template.json`).
- Rendering must be **deterministic** — same inputs always produce same outputs.
- Sanitize all user inputs before interpolation to prevent injection.
- Support dry-run mode for previewing output without writing files.
