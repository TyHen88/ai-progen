# AGENTS.md — infrastructure/

## Purpose
**Infrastructure and DevOps** — Configuration files for containerization, orchestration, web serving, monitoring, and operational scripts.

## Sub-Directories
| Directory | Description |
|-----------|-------------|
| `docker/` | Dockerfiles and Docker Compose configs |
| `kubernetes/` | Kubernetes manifests and Helm charts |
| `nginx/` | Nginx reverse proxy configurations |
| `monitoring/` | Monitoring and observability configs |
| `scripts/` | Operational and automation scripts |

## Agent Guidelines
- All infrastructure changes must be reviewed before applying to production.
- Use Infrastructure as Code (IaC) principles — no manual changes.
- Secrets must be managed via a secrets manager (Vault, K8s Secrets).
