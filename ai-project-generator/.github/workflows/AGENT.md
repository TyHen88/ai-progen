# AGENT.md — .github/workflows

## Purpose
**GitHub Actions Workflows** — Automated CI/CD pipelines for testing, building, and deploying the application.

## Workflow Files
| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `ci.yml` | PR / push | Lint, test, build all apps |
| `cd-staging.yml` | Merge to `main` | Deploy to staging environment |
| `cd-production.yml` | Git tag release | Deploy to production environment |
| `dependency-check.yml` | Schedule | Scan for vulnerable dependencies |

## Agent Guidelines
- Cache dependencies (node_modules, Maven .m2) to speed up CI.
- Run tests in parallel where possible.
- Always run linting before tests.
- Require successful CI before allowing PR merge (enforce via branch protection).
