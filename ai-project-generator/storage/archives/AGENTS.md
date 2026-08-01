# AGENTS.md — storage/archives

## Purpose
**Project Archives** — Stores the final ZIP/RAR/7z archives of generated projects, ready for user download.

## Agent Guidelines
- Filename format: `<job-id>-<project-name>-<timestamp>.<ext>`
- Implement download expiry links (signed URLs) for security.
- Archive files older than 7 days should be automatically deleted.
- Track download counts per archive for analytics.
