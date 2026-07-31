# PROCESS.md — packages/template-engine (Template Rendering Process)

This document specifies the process for the **Template Rendering Engine Package**.

---

## 📌 Template Engine Process Pipeline

```text
[ Raw Template Directory ] + [ AI Generated Files ]
                       │
                       ▼
       Variable & Parameter Interpolation
       ({{PROJECT_NAME}}, {{PACKAGE_NAME}}, {{DB_URL}})
                       │
                       ▼
       AI Agent Context Injection (.ai/ & .cursor/)
                       │
                       ▼
       Synthesized Project File Tree
```
