# AGENT.md — packages/prompts

## Purpose
**AI Prompt Templates** — Manages all prompt templates used to instruct AI models during project generation.

## Responsibilities
- Define structured prompt templates per project type
- Support variable interpolation in prompts
- Version prompt templates for reproducibility
- Export prompt builders and utility functions

## Agent Guidelines
- Each template must be versioned (e.g., `v1`, `v2`).
- Use clear, deterministic prompts — avoid ambiguous instructions.
- Test prompts against all supported AI providers before merging.
- Document expected inputs/outputs for every prompt template.
