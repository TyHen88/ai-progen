# AGENT.md — generated/

## Purpose
**Temporary Generated Projects** — Holds temporarily generated project output before it is archived and served for download.

> **WARNING**: This directory is ephemeral. Files here are temporary and must be cleaned up after archiving.

## Lifecycle
1. Project generation starts — output written to `generated/<job-id>/`
2. Archive package created — stored in `storage/archives/`
3. Cleanup task runs — `generated/<job-id>/` is deleted

## Agent Guidelines
- NEVER commit files in this directory to version control (ensure `.gitignore` excludes it).
- Each generation job must use a unique subdirectory (UUID-based).
- Implement a cleanup cron job to purge stale generated files older than 24 hours.
