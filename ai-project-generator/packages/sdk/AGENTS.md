# AGENTS.md — packages/sdk

## Purpose
**Generated API Client SDK** — A typed client for communicating with `apps/api`. Auto-generated from the OpenAPI specification.

## Responsibilities
- Provide typed API method wrappers
- Handle authentication headers
- Manage request/response interceptors
- Expose typed error classes

## Agent Guidelines
- This package is **auto-generated** — do NOT manually edit generated files.
- Regenerate by running the codegen script against the latest OpenAPI spec.
- Manual customizations should go in a separate `src/extensions/` directory.
