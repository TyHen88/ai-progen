# AGENTS.md — infrastructure/docker

## Purpose
**Docker Configurations** — Dockerfiles and Docker Compose files for building and running the application stack.

## Contents
- `Dockerfile.*` — Per-service Dockerfiles
- `docker-compose.yml` — Local development stack
- `docker-compose.prod.yml` — Production stack

## Agent Guidelines
- Use multi-stage builds to minimize image sizes.
- Pin base image versions — never use `latest`.
- Expose only necessary ports.
- Use health checks in all service definitions.
