# PROCESS.md — packages/archive (Archive Compression Process)

This document specifies the process for the **Archive Compression Package**.

---

## 📌 Archive Compression Process Pipeline

```text
[ Generated Project Folder ]
             │
             ▼
   ArchiveService.createZipArchive()
             │
   ┌─────────┼─────────┐
   ▼         ▼         ▼
  .zip     .rar       .7z
             │
             ▼
   Output Compressed File
```
