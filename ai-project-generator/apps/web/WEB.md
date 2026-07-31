For long-term maintainability, I recommend treating the **web frontend** the same way as the backend: **feature-first**, **domain-driven**, and **AI-friendly**. Avoid organizing everything under `components/` or `pages/`. Instead, organize by business capability.

---

# Workspace Structure

```text
ai-project-generator/

apps/
├── web/                  # Next.js Frontend
├── api/                  # Spring Boot Backend
├── worker/               # Background Jobs
└── admin/                # Optional Admin

packages/
├── ui/
├── shared/
├── sdk/
├── types/
├── config/
└── utils/

templates/

docs/

.ai/
```

---

# Next.js Structure

```text
apps/
└── web/
    ├── app/
    ├── components/
    ├── features/
    ├── services/
    ├── hooks/
    ├── stores/
    ├── lib/
    ├── providers/
    ├── layouts/
    ├── middleware/
    ├── types/
    ├── constants/
    ├── config/
    ├── styles/
    ├── assets/
    ├── public/
    ├── locales/
    ├── tests/
    └── package.json
```

---

# App Router

```text
app/

(auth)/
    login/
    register/
    forgot-password/

(dashboard)/

dashboard/

projects/

templates/

generator/

downloads/

history/

marketplace/

billing/

settings/

profile/

admin/

api/

layout.tsx

loading.tsx

error.tsx

not-found.tsx

page.tsx
```

Use Route Groups (`(auth)` and `(dashboard)`) to keep layouts clean.

---

# Feature-Based Structure

Instead of putting everything into `components`, organize by feature.

```text
features/

auth/

dashboard/

project/

generator/

template/

download/

marketplace/

history/

profile/

settings/

billing/

notification/

ai/

workspace/

organization/
```

---

Example:

```text
features/

generator/

components/

hooks/

services/

api/

schemas/

types/

store/

utils/

constants/

actions/
```

Everything related to project generation stays together.

---

# Shared Components

```text
components/

ui/

layout/

navigation/

forms/

feedback/

charts/

tables/

modals/

editors/

icons/

common/
```

`ui/` should contain reusable shadcn/ui wrappers.

---

# Services

```text
services/

api/

auth/

project/

generator/

template/

download/

storage/

billing/

marketplace/

notification/

user/
```

These contain API clients only, without UI logic.

---

# Hooks

```text
hooks/

useAuth.ts

useTheme.ts

useDebounce.ts

usePagination.ts

useUpload.ts

useDownload.ts

useGenerator.ts

useProject.ts
```

Keep hooks reusable and focused.

---

# Global State

```text
stores/

auth/

theme/

workspace/

notification/

generator/

download/
```

Recommended libraries:

* Zustand (global UI state)
* TanStack Query (server state)

Avoid duplicating server data in Zustand.

---

# Lib

```text
lib/

axios/

fetcher/

auth/

query/

logger/

storage/

validation/

date/

format/

markdown/

download/

zip/
```

Utilities and third-party wrappers belong here.

---

# Providers

```text
providers/

ThemeProvider

QueryProvider

AuthProvider

ToastProvider

SocketProvider

ModalProvider
```

Compose these once in the root layout.

---

# Config

```text
config/

app.ts

api.ts

auth.ts

theme.ts

routes.ts

navigation.ts

feature-flags.ts

environment.ts
```

Avoid hardcoding URLs or feature flags.

---

# Constants

```text
constants/

roles.ts

permissions.ts

languages.ts

icons.ts

status.ts

project-types.ts

template-types.ts
```

---

# Types

```text
types/

auth.ts

user.ts

project.ts

template.ts

generator.ts

download.ts

api.ts

pagination.ts
```

Shared interfaces and type definitions.

---

# Assets

```text
assets/

images/

icons/

illustrations/

lottie/

logos/
```

---

# Public

```text
public/

images/

favicon/

robots.txt

manifest.json
```

---

# Internationalization

```text
locales/

en/

km/

ko/

ja/
```

Organize translation files by language.

---

# API Layer

```text
services/

api/

axios.ts

interceptor.ts

client.ts

auth.api.ts

generator.api.ts

project.api.ts

template.api.ts

download.api.ts

billing.api.ts
```

Each feature imports its own API module.

---

# TanStack Query

```text
services/

query/

query-client.ts

query-keys.ts

mutations.ts
```

Feature example:

```text
features/

generator/

queries/

useGenerateProject.ts

useGeneratorHistory.ts

useProjectStatus.ts
```

---

# Forms

```text
features/

generator/

forms/

ProjectForm.tsx

TechnologyForm.tsx

ArchitectureForm.tsx

OutputForm.tsx
```

Each step of the wizard is isolated.

---

# AI Components

```text
features/

ai/

components/

PromptEditor.tsx

AIProviderSelector.tsx

TokenCounter.tsx

PromptHistory.tsx

GenerationProgress.tsx

PreviewPanel.tsx
```

These are specific to AI interactions.

---

# Recommended Dependencies

## Core

```text
Next.js (latest)

React

TypeScript
```

---

## UI

```text
Tailwind CSS

shadcn/ui

Lucide React

Framer Motion

class-variance-authority

tailwind-merge

clsx
```

---

## Forms

```text
React Hook Form

Zod

@hookform/resolvers
```

---

## Data Fetching

```text
TanStack Query

Axios
```

---

## State

```text
Zustand
```

---

## Authentication

```text
Auth.js

or

Clerk

or

Firebase Authentication
```

Choose one based on your backend strategy.

---

## Tables

```text
TanStack Table
```

---

## Charts

```text
Recharts
```

---

## Markdown

```text
react-markdown

remark-gfm
```

---

## Code Editor

```text
Monaco Editor
```

Useful for editing prompts, generated configuration files, and templates.

---

## Drag & Drop

```text
dnd-kit
```

---

## File Upload

```text
react-dropzone
```

---

## Notifications

```text
Sonner
```

---

## Theme

```text
next-themes
```

---

## Icons

```text
Lucide React
```

---

## Validation

```text
Zod
```

---

# Environment Configuration

```text
.env.local

.env.development

.env.staging

.env.production
```

Example variables:

```text
NEXT_PUBLIC_API_URL=

NEXT_PUBLIC_APP_NAME=

NEXT_PUBLIC_ENABLE_AI=

NEXT_PUBLIC_ENABLE_MARKETPLACE=

NEXT_PUBLIC_ENABLE_BILLING=

NEXT_PUBLIC_DEFAULT_LANGUAGE=

NEXT_PUBLIC_SENTRY_DSN=
```

---

# AI-Friendly Documentation

Include an `.ai/` directory at the repository root so AI coding assistants can quickly understand the frontend architecture:

```text
.ai/
├── frontend-context.md
├── frontend-rules.md
├── component-guidelines.md
├── folder-structure.md
├── routing-conventions.md
├── state-management.md
├── api-integration.md
├── ui-patterns.md
├── accessibility.md
├── workflows/
└── prompts/
```

These files document routing conventions, component patterns, API integration, state management, and coding standards. They significantly improve the consistency of code generated by tools such as Codex, Claude Code, Cursor, GitHub Copilot, and Gemini CLI.

## Overall Architecture

```text
apps/
├── web/
├── api/
├── worker/
└── admin/

packages/
├── ui/
├── sdk/
├── shared/
├── config/
├── types/
└── utils/

templates/
docs/
.ai/
```

This structure gives you a scalable monorepo where each application has a clear responsibility, shared code lives in reusable packages, and both human developers and AI agents can navigate the project efficiently.
