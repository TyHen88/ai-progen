# Containerization & Deployment Process

This document outlines the container deployment strategy, multi-stage Docker builds, and Docker Compose orchestration for local and production environments.

---

## 🐳 Docker Container Architecture

```text
                           [ Reverse Proxy / Ingress ]
                                        │
                      ┌─────────────────┴─────────────────┐
                      ▼                                   ▼
             [ Web Container ]                   [ API Container ]
             Next.js 15 App Router               Spring Boot 3.4 API
             Port: 3000                          Port: 8080
                      │                                   │
                      └─────────────────┬─────────────────┘
                                        │
                      ┌─────────────────┴─────────────────┐
                      ▼                                   ▼
            [ PostgreSQL 16 DB ]                 [ Redis 7 Cache ]
            Port: 5432                           Port: 6379
```

---

## 📌 Environment Setup & Orchestration

### 1. Launching Services via Docker Compose
To spin up PostgreSQL, Redis, and the Spring Boot API service:

```bash
cd apps/api
docker-compose up -d
```

### 2. Spring Boot API Multi-Stage Build ([apps/api/Dockerfile](../../apps/api/Dockerfile))
- Stage 1 (`builder`): Compiles Java 17 bytecode with Gradle.
- Stage 2 (`runtime`): Copies the stripped `.jar` executable into Eclipse Temurin JRE Alpine for minimal image size.

### 3. Next.js Frontend Deployment ([apps/web](../../apps/web))
- Run production build validation:
```bash
cd apps/web
npm run build
npm run start
```
