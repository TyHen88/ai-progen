# AGENTS.md — packages/ui

## Purpose
**Shared UI Component Library** — Reusable React components used across `apps/web` and `apps/admin`.

## Responsibilities
- Design system tokens (colors, typography, spacing)
- Reusable components (Button, Card, Modal, Form, etc.)
- Layout components (Grid, Container, Sidebar)
- Animation utilities

## Agent Guidelines
- Components must be **accessible** (ARIA attributes, keyboard navigation).
- All components must have TypeScript prop types.
- Use CSS Modules or styled-components — no inline styles for complex components.
- Export everything from the package index (`index.ts`).
