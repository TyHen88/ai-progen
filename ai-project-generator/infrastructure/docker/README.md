# 🐳 Docker Infrastructure Guide

This guide details the Docker Compose commands for running the AI Project Generator services.

---

## 📌 Services & Ports

| Service | Container Name | Host Port | Container Port | Environment Details |
| :--- | :--- | :--- | :--- | :--- |
| **PostgreSQL 16** | `aiprogen_postgres` | `5434` | `5432` | DB: `aiprogen_db`, User: `aiprogen`, Password: `aiprogen_secret` |
| **Redis 7** | `aiprogen_redis` | `6379` | `6379` | Cache & Job Queue |
| **Spring Boot API** | `aiprogen_api` | `8080` | `8080` | Backend API |
| **Next.js Web UI** | `aiprogen_web` | `3000` | `3000` | Frontend UI |
| **MinIO Storage** | `aiprogen_minio` | `9000` (API) / `9001` (Console) | `9000` / `9001` | S3 Storage (Admin: `minioadmin` / `minioadminsecret`) |

---

## 🚀 Usage Commands

### Local Dev DB Setup (`apps/api`)

```bash
cd ai-project-generator/apps/api
docker compose up -d postgres redis
```

### Full Infrastructure Setup (`infrastructure/docker`)

```bash
cd ai-project-generator/infrastructure/docker
docker compose -f docker-compose.full.yml up -d --build
```

### Stop Services & Clean Volumes

```bash
# Stop containers
docker compose down

# Stop and remove volumes (Wipe DB data)
docker compose down -v
```

### Port Release (Kill Busy Port)

```bash
# Kill any process listening on port 8080 (API)
lsof -ti:8080 | xargs kill -9

# Kill any process listening on port 5434 (PostgreSQL)
lsof -ti:5434 | xargs kill -9
```
