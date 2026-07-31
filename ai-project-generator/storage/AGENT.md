# AGENT.md — storage/

## Purpose
**File Storage** — Manages persistent and temporary file storage for the application.

## Sub-Directories
| Directory | Description |
|-----------|-------------|
| `uploads/` | User-uploaded files (e.g., existing project specs) |
| `archives/` | Generated project archives ready for download |
| `cache/` | Cached data (AI responses, rendered templates) |

## Agent Guidelines
- In production, use cloud storage (AWS S3 / GCS / Azure Blob) instead of local filesystem.
- Implement retention policies — delete stale archives after configurable TTL.
- All uploaded files must be virus-scanned before processing.
