# Development Workflow & Monorepo Process

This document describes developer conventions, monorepo project organization, and quality verification commands.

---

## 🏗️ Monorepo Codebase Structure

- `apps/web/`: Next.js 15 App Router with Route Groups (`(auth)`, `(dashboard)`, `admin`).
- `apps/api/`: Spring Boot 3.4 Modular Monolith API engine with PostgreSQL & Redis.
- `packages/`: Shared packages (`shared-types`, `ui`, `sdk`).
- `docs/`: Comprehensive project specification & process guides.

---

## 📌 Quality Verification & Verification Checklist

Before pushing changes or opening a Pull Request, verify code quality across applications:

### 1. Frontend Type Safety & Build Verification
```bash
cd apps/web
npx tsc --noEmit
npx next build
```

### 2. Backend Compilation Verification
```bash
cd apps/api
.\gradlew.bat compileJava
```
