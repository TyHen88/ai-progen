# AGENT.md — apps/api

## Purpose
**Spring Boot REST API & Modular Monolith Engine** — The core backend application driving all business logic, AI orchestration, template generation, archive packaging, authentication, billing, and system metrics for the **AI Project Generator** platform.

## Responsibilities
- RESTful API endpoints for user auth, organization management, project generation, and template discovery
- AI Prompt & Model orchestration (OpenAI, Anthropic, Gemini, DeepSeek, OpenRouter, Ollama)
- Project Generation Pipeline (requirements breakdown, file tree builder, code renderer, validator)
- Archive creation & storage management (ZIP, RAR, 7z via S3 / MinIO / Local)
- Real-time generation status streaming (WebSockets / SSE)
- Role-based Access Control (RBAC) via Spring Security & JWT
- System auditing, metric telemetry, rate limiting, and administrative controls

## Tech Stack
- **Framework**: Spring Boot 4.1.1
- **Language**: Java 17
- **Database**: PostgreSQL with Flyway Migrations & HikariCP
- **ORM**: Spring Data JPA
- **Caching & Broker**: Redis & Spring Events
- **Security**: Spring Security 6 + OAuth2 + JWT
- **Documentation**: SpringDoc OpenAPI / Swagger UI
- **Build Tool**: Gradle

## Modular Monolith Architecture Standard

```text
apps/api/
├── build.gradle.kts
├── settings.gradle.kts
├── Dockerfile
├── docker-compose.yml
├── .env.example
├── config/                             # Spring Boot Profile Configurations
│   ├── application.yml
│   ├── application-dev.yml
│   ├── application-local.yml
│   └── application-prod.yml
├── docs/                               # Architecture & API Specs
└── src/
    ├── main/
    │   ├── java/com/projectgenerator/
    │   │   ├── Application.java
    │   │   ├── common/                 # Base annotations, pagination, response wrappers, exceptions
    │   │   ├── configuration/          # CORS, Security, Swagger, Redis, Async, AI configs
    │   │   ├── infrastructure/         # External integrations (S3, Redis, Mail, Queue, Archive)
    │   │   ├── shared/                 # Shared DTOs, mappers, events, base domain classes
    │   │   │
    │   │   ├── auth/                   # Authentication & Token Management
    │   │   ├── user/                   # User accounts & preferences
    │   │   ├── organization/           # Organizations & workspaces
    │   │   ├── project/                # Projects domain
    │   │   ├── template/               # Template management
    │   │   ├── generator/              # AI Project Generation Pipeline Engine
    │   │   ├── ai/                     # AI Chat, Completion, Context & Workflow Orchestration
    │   │   ├── provider/               # Interchangeable AI Providers (OpenAI, Gemini, Anthropic, DeepSeek)
    │   │   ├── prompt/                 # System prompt management & versioning
    │   │   ├── archive/                # ZIP/RAR/7z compression & extraction
    │   │   ├── download/               # Archive download sessions & statistics
    │   │   ├── storage/                # Abstract Storage (Local, S3, MinIO, Cloudflare R2)
    │   │   ├── notification/           # Email & in-app alerts
    │   │   ├── marketplace/            # Template marketplace & rating system
    │   │   ├── billing/                # Subscriptions, usage meters & credits
    │   │   ├── analytics/              # Telemetry & generation metrics
    │   │   ├── audit/                  # Security audit logging
    │   │   └── system/                 # Feature flags & system health
    │   └── resources/
    │       ├── db/migration/           # Flyway SQL Scripts
    │       ├── templates/              # Starter project templates
    │       └── prompts/                # System AI prompt definitions
    └── test/                           # JUnit 5, Mockito & Testcontainers
```

## Internal Module Pattern

Every feature module must strictly follow this internal structure:

```text
<feature_module>/
├── controller/        # REST API endpoints & Swagger annotations
├── service/           # Service interfaces
├── service/impl/      # Business logic implementation
├── repository/        # Spring Data JPA Repositories
├── entity/            # JPA Entities & DB Mapping
├── dto/               # Request & Response Data Transfer Objects
├── mapper/            # MapStruct object mappers
├── validator/         # Custom business validation logic
├── event/             # Module domain events
├── listener/          # Event listeners & reactive handles
├── job/               # Scheduled or async queue background tasks
└── exception/         # Custom module exceptions
```

## AI Agent Guidelines & Coding Standards

1. **Strict Layered Encapsulation**:
   - Controllers ONLY handle HTTP requests, DTO validation (`@Valid`), and return standardized `ApiResponse<T>`.
   - Business logic MUST reside inside `service/impl/`.
   - Database operations MUST pass through Spring Data JPA repositories.

2. **Standardized Responses & Error Handling**:
   - Wrap all responses in `com.projectgenerator.common.response.ApiResponse<T>`.
   - Throw custom domain exceptions extending `BusinessException`.
   - Never expose raw stack traces — handle all uncaught exceptions in `@RestControllerAdvice`.

3. **Database Migrations & Entities**:
   - Never rely on `hibernate.ddl-auto=update` in production profiles. All DB schema changes must use Flyway SQL scripts inside `resources/db/migration/`.

4. **Multi-Provider AI Abstraction**:
   - AI calls must pass through `com.projectgenerator.provider.factory.AiProviderFactory` using the common `AiProvider` interface.
