# AGENTS.md — apps/worker

## Purpose
**Background Job Worker** — Processes long-running tasks asynchronously such as AI code generation, template rendering, and archive packaging.

## Responsibilities
- Consume jobs from the message queue (Redis/RabbitMQ)
- Execute AI generation pipelines
- Render project templates
- Package output into ZIP/RAR archives
- Update job status in the database

## Agent Guidelines
- Workers must be **idempotent** — safe to retry on failure.
- Always update job status (PENDING -> RUNNING -> DONE/FAILED).
- Log all steps with structured logging (JSON format).
- Handle timeouts gracefully and report errors back to the queue.
