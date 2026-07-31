# AGENT.md — templates/github

## Purpose
**GitHub Templates** — GitHub Actions CI/CD workflow templates and repository configuration files.

## Includes
- CI workflow (lint, test, build)
- CD workflow (deploy to staging/production)
- Dependabot configuration
- Issue templates
- Pull request templates

## Agent Guidelines
- Workflows must use pinned action versions (e.g., `actions/checkout@v4`).
- Secrets must be referenced via `secrets.SECRET_NAME` — never hardcoded.
