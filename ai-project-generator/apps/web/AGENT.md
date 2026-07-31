# AGENT.md — apps/web

## Purpose
**Next.js Frontend** — The primary user-facing web application for the **AI Project Generator** platform.

## Responsibilities
- Interactive AI Project Generation wizard (requirements analysis, tech stack & architecture selection)
- Real-time generation progress display (SSE / WebSockets)
- Template browsing, searching, and marketplace integration
- Archive downloading (ZIP, RAR, 7z) and generation history
- User authentication, profile management, and billing UI
- Admin management console (analytics, users, templates, AI providers, queues, logs)

## Tech Stack
- **Framework**: Next.js 15+ (App Router with Route Groups)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS, CSS Modules
- **Icons**: Lucide React
- **Animation**: Framer Motion (`motion/react`)
- **Forms & Validation**: React Hook Form, Zod
- **State & Data Fetching**: Zustand, TanStack Query (React Query)
- **API Communication**: REST via `@/services/api` & `packages/sdk`

## Directory & Architecture Standard

```text
apps/web/
├── app/
│   ├── (auth)/                         # Auth Route Group (Isolated Auth Layout)
│   │   ├── layout.tsx
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── forgot-password/page.tsx
│   ├── (dashboard)/                    # Dashboard Route Group (AppShell Header & Sidebar Layout)
│   │   ├── layout.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── projects/page.tsx
│   │   ├── templates/page.tsx
│   │   ├── generator/page.tsx
│   │   ├── downloads/page.tsx
│   │   ├── history/page.tsx
│   │   ├── marketplace/page.tsx
│   │   ├── billing/page.tsx
│   │   ├── settings/page.tsx
│   │   ├── profile/page.tsx
│   │   ├── favorites/page.tsx
│   │   ├── agents/page.tsx
│   │   └── help/page.tsx
│   ├── admin/                          # Admin Management Console
│   │   ├── layout.tsx                  # Admin Header & Sidebar Layout
│   │   └── page.tsx
│   ├── api/                            # Next.js Route Handlers
│   │   └── health/route.ts
│   ├── layout.tsx                      # Root HTML & Theme Provider
│   └── page.tsx                        # Landing Page
├── features/                           # Domain Feature Modules
│   ├── auth/                           # Authentication feature UI & logic
│   ├── dashboard/                      # Dashboard overview & stats
│   ├── generator/                      # Project generation wizard
│   ├── template/                       # Template grid & details
│   ├── project/                        # Projects list & preview
│   ├── download/                       # Downloads history table
│   ├── marketplace/                    # Template marketplace
│   ├── favorites/                      # Favorited templates & projects
│   ├── ai/                             # AI agents showcase & config rules
│   ├── settings/                       # User settings & API key management
│   ├── help/                           # Documentation & help center
│   ├── admin/                          # Admin pages & metric dashboards
│   └── billing/                        # Subscriptions & billing
├── components/                         # Shared UI Components
│   ├── ui/                             # Primitive UI components (Dialogs, Modals, Buttons)
│   ├── layout/                         # Header, Sidebar, AppShell
│   ├── theme/                          # ThemeProvider & theme toggles
│   └── landing/                        # Landing page marketing components
├── services/                           # API Service Layer
│   └── api/client.ts                   # Fetch API wrapper
├── config/                             # Application Configuration
│   └── app.config.ts
├── constants/                          # System & Route Constants
│   └── routes.ts
├── providers/                          # Context Providers
└── stores/                             # Zustand State Stores
```

## AI Agent Guidelines & Coding Standards

1. **Feature-First Organization**:
   - Place all domain-specific UI components, hooks, schemas, and types inside `@/features/<domain_name>/`.
   - Keep shared primitive components in `@/components/ui/` or `@/components/layout/`.

2. **Route Group Isolation**:
   - `app/(auth)/` is for unauthenticated pages (login, register, reset-password).
   - `app/(dashboard)/` uses `DashboardLayout` containing the persistent `Header` and `Sidebar`.
   - `app/admin/` uses `AdminLayout` containing `AdminHeader` and `AdminSidebar`.
   - `app/page.tsx` is dedicated to the public landing page.

3. **Type Safety & Path Aliases**:
   - Import feature components using `@/features/<domain>/...`.
   - Import shared types from `packages/shared-types` or `@/lib/types`.
   - Use `zod` schemas for form validation.

4. **API & Data Layer**:
   - All API interactions should use `@/services/api/client.ts` or `packages/sdk`. Do NOT make raw, unhandled `fetch` calls in UI components.
   - Separate server state (handled by React Query / API clients) from global UI state (handled by Zustand).

5. **Performance & SEO**:
   - Use Next.js `<Image />` for optimized image loading.
   - All page endpoints must export proper metadata and render cleanly without synchronous `setState` side-effects in React effects.
