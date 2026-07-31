# Frontend Architecture — apps/web

## Stack

Next.js 15 (App Router), React 19, TypeScript (strict), Tailwind CSS 4, Lucide icons, Framer Motion (`motion` package), React Hook Form + Zod, Recharts. No state-management library, no HTTP client library, and no test framework are installed yet — `package.json` name is currently `ai-studio-applet` (leftover from the project's Google AI Studio origin, should be renamed).

## Routing

App Router with route groups:

```
app/
├── (auth)/          login, register, forgot-password — own layout
├── (dashboard)/      dashboard, generator, templates, projects, downloads,
│                       marketplace, favorites, agents, settings, help,
│                       history, profile, billing — shared dashboard layout
├── admin/              own layout, outside the route groups
├── api/health/          Next.js route handler
├── layout.tsx           root layout — ThemeProvider only, no auth/data provider
└── page.tsx               landing page
```

## Feature-first organization

```
features/<domain>/    UI + logic for one domain (generator, template, project, ...)
components/            shared/cross-feature components, plus components/ui primitives
lib/                     utilities — including mock-data.ts and types.ts (see below)
services/api/             API client — client.ts only
hooks/, stores/, providers/, config/, constants/
```

17 feature folders exist under `features/`. Of those, `auth`, `admin`, `generator`, `template`, `dashboard`, `project`, `ai`, `download`, `favorites`, `marketplace`, `help`, `settings` have real components. `billing`, `history`, `notification`, `profile`, `workspace` are empty directories — routes for them exist but no dedicated feature module backs them yet.

## Data layer — currently disconnected from the backend

`lib/mock-data.ts` defines hardcoded constants (`INITIAL_PROJECTS`, `MOCK_TEMPLATES`, `MOCK_AI_AGENTS`, `MOCK_DOWNLOAD_HISTORY`, `MOCK_NOTIFICATIONS`, `MOCK_API_KEYS`) and every feature component reads from these directly. `services/api/client.ts` defines a generic `apiFetch<T>()` wrapper around `fetch()`, but nothing in `features/` calls it yet. `lib/types.ts` defines the UI-facing shapes (`GeneratedProject`, `TemplateItem`, `TechStackConfig`, etc.) independently of the backend's actual DTOs — treat these as provisional, not a contract, until `packages/shared-types` exists (see `system.md`).

**Do not add new mock data.** If a feature needs data the backend doesn't yet serve, either build the backend endpoint first or clearly flag the mock as temporary in `../memory/known-issues.md`.

## Conventions

- Use the App Router (`app/`) convention, never Pages Router.
- Import shared types from `packages/shared-types` once it exists; until then, `lib/types.ts` is the single source of truth — don't redefine the same shape in a feature folder.
- Pure/presentational components belong in `components/ui`; anything with data-fetching or side effects belongs in `features/<domain>/`.
- All routes must have proper SEO metadata via the Next.js metadata API.
- TypeScript strict mode is on — no `any` without a comment explaining why it's unavoidable.

## Build / verify

```
cd apps/web && npx tsc --noEmit && npx next build
```
