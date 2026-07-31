# AGENT.md — packages/archive

## Purpose
**Archive Utilities** — Handles creation and extraction of ZIP, RAR, and 7z archive files for generated projects.

## Responsibilities
- Package generated project directories into archives
- Support ZIP, RAR, 7z formats
- Stream archives for large projects (avoid memory overflows)
- Clean up temporary files after archiving

## Agent Guidelines
- Always stream large archives — do not buffer entire file in memory.
- Validate archive integrity after creation.
- Store output archives in `storage/archives/`.
- Clean up temp files in `generated/` after successful archiving.
