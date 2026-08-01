# AGENTS.md — storage/cache

## Purpose
**Cache Storage** — Stores cached data such as AI responses, rendered template outputs, and other expensive computation results.

## Agent Guidelines
- Cache keys must include version/hash to avoid stale data.
- Set appropriate TTL for each cache type.
- Implement cache invalidation strategy for prompt or template updates.
- Use Redis for distributed caching in production (this directory is for local/dev use).
