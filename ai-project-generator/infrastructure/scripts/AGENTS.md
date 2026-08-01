# AGENTS.md — infrastructure/scripts

## Purpose
**Operational Scripts** — Shell scripts and automation utilities for deployment, maintenance, and operational tasks.

## Contents
- Deployment scripts (`deploy.sh`)
- Database migration scripts
- Backup and restore scripts
- Cleanup and maintenance scripts
- Health check scripts

## Agent Guidelines
- All scripts must be idempotent where possible.
- Include usage documentation at the top of every script.
- Test scripts in a non-production environment before use.
- Use exit codes correctly (`exit 0` for success, non-zero for failure).
