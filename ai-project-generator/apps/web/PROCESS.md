# PROCESS.md — apps/web (Frontend Process Specification)

This document outlines the workflow and operational process for the **Next.js Web Application**.

---

## 📌 Web Application Process Pipeline

```text
[ User Action / Router Navigation ]
                 │
                 ▼
     1. App Router Route Groups
        - (auth): Isolated login / register / forgot-password layout
        - (dashboard): Persistent Header & Sidebar AppShell
        - admin: Dynamic query section routing (/admin?section=...)
                 │
                 ▼
     2. Form Input & Wizard State
        - React Hook Form + Zod schema validation
        - Live step state management via Zustand
                 │
                 ▼
     3. API Service Integration (@/services/api)
        - HTTP REST client request with Bearer JWT header
        - TanStack Query (React Query) server state synchronization
                 │
                 ▼
     4. Real-time Status & Progress Updates
        - Event polling / SSE status stream
                 │
                 ▼
     5. Download Execution & Artifact Delivery
        - Direct download trigger for generated .zip archives
```

---

## 🛠️ Code Conventions & Architectural Rules
- **Domain Modules**: Group feature components inside `@/features/<domain_name>/`.
- **Layouts**: Use `DashboardLayout` for authenticated routes; `AuthCard` for auth routes; `AdminLayout` for admin console.
- **Theme**: Support Light/Dark mode via `ThemeProvider` and `@custom-variant dark`.
- **Validation**: Execute `npx tsc --noEmit` and `npx next build` before deployment.
