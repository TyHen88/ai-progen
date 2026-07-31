# AI Project Generation Process

This document outlines the step-by-step process of how an AI Project Generation job executes within the platform, from user prompt submission to final archive packaging and download delivery.

---

## 🔄 Generation Pipeline Flowchart

```text
[User Prompt] 
      │
      ▼
1. Validation & Input Normalization (GeneratorController)
      │
      ▼
2. Job Queue Dispatch (GeneratorService - Async Worker)
      │
      ▼
3. AI Requirements & Stack Selection (AiProvider / Gemini)
      │
      ▼
4. Project File Tree & Code Synthesis (TemplateEngine & CodeBuilder)
      │
      ▼
5. Syntax Verification & Quality Audit
      │
      ▼
6. Archive Packaging (ZIP / RAR / 7z via ArchiveService)
      │
      ▼
7. Storage Upload (Local / S3 / MinIO via StorageService)
      │
      ▼
[Completed Project Ready for Download]
```

---

## 📌 Phase Breakdown

### Phase 1: Request Ingestion & Validation
- Client submits a `POST /api/v1/generator/generate` payload containing the natural language project prompt, target framework, database preference, and optional feature flags (auth, docker, tests).
- `GeneratorController` validates DTO constraints (`@Valid`).
- A unique `jobId` (`job_xxxxxxxx`) is generated and registered with status `QUEUED`.

### Phase 2: Asynchronous Job Execution
- The generation task is handed off to an asynchronous worker queue (`@Async` in Spring Boot API or Redis job queue).
- Client receives immediate HTTP 200 response with `jobId` and polls `GET /api/v1/generator/jobs/{jobId}` for real-time progress percentage (`20%`, `40%`, `75%`, `100%`).

### Phase 3: AI Prompt & Stack Selection
- `AiProviderFactory` selects the active AI Provider (`Gemini`, `OpenAI`, `Anthropic`, or `DeepSeek`).
- System prompts analyze the user requirement to select optimal frontend (`Next.js`, `React`, `Vue`), backend (`Spring Boot`, `Node.js`), and database (`PostgreSQL`, `MongoDB`).

### Phase 4: Code Building & Template Synthesis
- `ProjectBuilder` combines base starter templates with AI-synthesized code files.
- Generates configuration files (`Dockerfile`, `docker-compose.yml`, `README.md`, `.env.example`).

### Phase 5: Packaging & Storage
- `ArchiveService` compresses the generated project tree into a clean archive (`.zip`, `.tar.gz`).
- `StorageService` saves the artifact and updates project record status to `READY`.
