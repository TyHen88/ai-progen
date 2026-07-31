# PROCESS.md — apps/api (Spring Boot API Process Specification)

This document outlines the workflow and operational process for the **Spring Boot REST API & Modular Monolith Engine**.

---

## 📌 API Engine Process Pipeline

```text
[ Incoming HTTP Request ]
            │
            ▼
 1. Spring Security 6 Filter Chain (JwtAuthenticationFilter)
    - Validates Bearer JWT signature & populates SecurityContext
            │
            ▼
 2. REST Controller Layer (com.projectgenerator.*.controller)
    - Validates request DTOs (@Valid) & handles HTTP responses
            │
            ▼
 3. Service & Business Layer (com.projectgenerator.*.service)
    - Executes domain business logic, AI orchestration & transactions
            │
            ▼
 4. Multi-Provider AI Engine (AiProviderFactory)
    - Dispatches prompt to Gemini, OpenAI, Anthropic, or DeepSeek
            │
            ▼
 5. Archive & Storage Engine (ArchiveService & StorageService)
    - Compresses workspace into ZIP archive and saves to storage
            │
            ▼
 6. Persistence & Response
    - Updates PostgreSQL via Spring Data JPA & returns ApiResponse<T>
```

---

## 🛠️ Code Conventions & Architectural Rules
- **Modular Monolith**: Maintain strict package encapsulation (`controller`, `service`, `repository`, `entity`, `dto`).
- **Database Migrations**: Flyway versioned SQL migrations (`V1__init_schema.sql`).
- **Security**: BCrypt password hashing, stateless sessions, JWT access tokens.
- **Validation**: Execute `.\gradlew.bat compileJava` before committing.
