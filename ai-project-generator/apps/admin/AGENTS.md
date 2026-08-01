# AGENTS.md — apps/admin

## Purpose
**Admin Panel** — Internal management interface for monitoring, configuration, and operations.

## Responsibilities
- Monitor project generation jobs and their statuses
- Manage AI provider configurations and API keys
- View system metrics and logs
- Manage users and access control

## Agent Guidelines
- Admin panel is for **internal use only** — enforce strict authentication.
- Do NOT expose sensitive data (API keys, tokens) in the UI directly.
- Use role-based access control (RBAC) for all admin actions.
