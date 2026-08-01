# AGENTS.md — .github/

## Purpose
**GitHub Configuration** — CI/CD workflows, issue templates, and pull request templates for the repository.

## Contents
| Path | Description |
|------|-------------|
| `workflows/` | GitHub Actions CI/CD pipeline definitions |
| `ISSUE_TEMPLATE/` | Standardized issue report templates |
| `PULL_REQUEST_TEMPLATE.md` | PR checklist and description template |

## Agent Guidelines
- All CI checks must pass before merging to `main`.
- Workflows should run on `push` to feature branches and `pull_request` to `main`.
- Use reusable workflow definitions to avoid duplication.
- Pin action versions using commit SHAs for security.
