# AGENTS.md — packages/ai-provider

## Purpose
**AI Provider Abstraction Layer** — Provides a unified interface for interacting with multiple AI providers (OpenAI, Anthropic Claude, Google Gemini, etc.).

## Responsibilities
- Abstract provider-specific APIs behind a common interface
- Handle authentication per provider
- Manage rate limiting and retries
- Support streaming responses
- Track token usage and costs

## Agent Guidelines
- New providers must implement the `AIProvider` interface.
- Never hardcode API keys — use environment variables.
- All provider calls must include error handling and retry logic.
- Log token usage for cost monitoring.
