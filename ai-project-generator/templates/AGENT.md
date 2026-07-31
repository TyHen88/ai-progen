# AGENT.md — templates/

## Purpose
**Project Templates** — Contains scaffolding templates for all supported project types that the AI generator can produce.

## Available Templates
| Template | Description |
|----------|-------------|
| `spring-boot/` | Spring Boot Java/Kotlin REST API |
| `nextjs/` | Next.js TypeScript frontend |
| `nestjs/` | NestJS TypeScript backend |
| `flutter/` | Flutter mobile application |
| `telegram-bot/` | Telegram Bot (Python/Node.js) |
| `docker/` | Docker/Docker Compose configurations |
| `github/` | GitHub Actions CI/CD workflows |

## Template Structure Convention
Each template directory should contain:
- `template.json` — manifest with metadata and variables
- `files/` — template source files with interpolation placeholders
- `README.md` — description and usage instructions

## Agent Guidelines
- Use `{{VARIABLE_NAME}}` syntax for interpolation placeholders.
- Every template must define required variables in `template.json`.
- Test templates end-to-end before adding new ones.
