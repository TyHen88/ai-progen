# AGENT.md — templates/telegram-bot

## Purpose
**Telegram Bot Template** — Scaffolding for a Telegram bot application.

## Includes
- Python (python-telegram-bot) or Node.js (grammy/telegraf)
- Command handler structure
- Webhook / polling setup
- Docker deployment config
- Environment-based configuration

## Agent Guidelines
- Token must always come from environment variables — never hardcode.
- Structure handlers by command category (e.g., `handlers/start.py`).
