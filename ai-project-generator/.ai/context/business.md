# Business Context

Source: `/PRD.md`, `/TECHSTACK&DEICION.md` (repo root).

## The pitch

An AI-driven project scaffolding SaaS, positioned as a combination of:
- Cursor + Create React App
- Spring Initializr + AI
- Vercel v0 — but for complete application architecture, not just a component

The core loop: describe a system in plain language → the platform picks a stack and architecture → it generates the full project (code, docs, Docker, CI, AI-agent config) → the user downloads a ready-to-open archive.

## Audience

Developers and small teams who want a production-shaped starting point without hand-assembling boilerplate — the same audience as a framework initializer, but the pitch is "any stack, any architecture" rather than one framework's own generator.

## Differentiation

Most generators (Spring Initializr, `create-next-app`, etc.) scaffold a single technology from a fixed template. The differentiation claimed here is combining requirement analysis from natural language, architecture-pattern selection (layered, clean, DDD, microservices, modular monolith), multi-stack scaffolding in one output, generated documentation, and AI-agent context files (`.ai/`, `.cursor/`, etc.) so the *output* project is immediately usable by both a human and a coding agent — not just folders and code.

## Business model signals (from the docs, not yet built)

- **Credits** — new users are seeded with 100 credits on registration (implemented in `AuthServiceImpl`); the metering/spend model around this isn't defined yet.
- **Subscriptions / billing** — named in the planned schema (`subscriptions`, `credits` tables) and as a frontend route (`apps/web/features/billing`, currently empty). No backend billing module exists.
- **Marketplace** — users publish and one-click reuse templates (Spring Boot Starter, Next.js SaaS, Telegram Bot, CRM, POS, etc.). Frontend has a `marketplace` route with mock data; no backend module.
- **Enterprise tier** — instead of one project, scaffold an entire multi-app engineering workspace (backend/frontend/mobile/infra/docs/tests/monitoring in one archive). Concept only, nothing built.

## What "done" looks like for v1

A user submits one prompt, gets one real, non-simulated generated project (one stack, one architecture pattern) as a downloadable archive, end to end. See `roadmap.md` for the gap between that and today.
