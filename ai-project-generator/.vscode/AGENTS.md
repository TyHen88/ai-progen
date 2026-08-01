# AGENTS.md — .vscode/

## Purpose
**VS Code Workspace Configuration** — Editor settings, recommended extensions, launch configurations, and tasks for the development team.

## Contents
| File | Description |
|------|-------------|
| `settings.json` | Workspace editor settings |
| `extensions.json` | Recommended VS Code extensions |
| `launch.json` | Debug launch configurations |
| `tasks.json` | Custom task definitions |

## Recommended Extensions
- ESLint, Prettier — Code quality
- Spring Boot Extension Pack — Java/Kotlin development
- Docker — Container management
- GitLens — Git history and blame
- REST Client — API testing

## Agent Guidelines
- Keep `settings.json` consistent with the project's linting and formatting rules.
- Add new recommended extensions as the tech stack evolves.
- Do NOT store personal/user-specific settings here — use user-level VS Code settings.
