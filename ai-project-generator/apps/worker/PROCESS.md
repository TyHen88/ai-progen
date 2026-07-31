# PROCESS.md — apps/worker (Background Job Worker Process Specification)

This document outlines the workflow and operational process for the **Background Job Worker**.

---

## 📌 Background Job Worker Process Pipeline

```text
[ Redis / RabbitMQ Queue Listener ]
                 │
                 ▼
     1. Job Message Dequeue
        - Receives GenerationJobPayload (jobId, prompt, stack, userId)
                 │
                 ▼
     2. AI Code Generation Execution
        - Invokes AiProviderFactory to generate file tree & source code
                 │
                 ▼
     3. Workspace Construction
        - Merges starter templates with generated source files
        - Injects .ai/ context & .cursor/ rules
                 │
                 ▼
     4. Compression & Storage Packaging
        - Generates .zip archive via ArchiveService
        - Uploads artifact to S3 / MinIO / Local storage
                 │
                 ▼
     5. Real-Time Status & Notification Dispatch
        - Emits WebSocket / SSE completion event to frontend
```
