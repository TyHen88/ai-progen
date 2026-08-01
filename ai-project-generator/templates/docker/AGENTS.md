# AGENTS.md — templates/docker

## Purpose
**Docker Template** — Reusable Dockerfile and Docker Compose configurations for various stacks.

## Includes
- Multi-stage Dockerfiles for optimized image sizes
- Docker Compose templates for local development
- Production-ready Docker Compose configs
- `.dockerignore` patterns

## Agent Guidelines
- Always use multi-stage builds for production images.
- Use specific image tags — never use `latest` in production.
- Document all exposed ports and volumes.
