# 🐳 Docker Guide — AI Project Generator

This guide provides commands and instructions for running database services, workers, and full application stack using Docker & Docker Compose.

---

## 📌 Services & Port Mapping

| Service | Container Name | Host Port | Container Port | Default Credentials / Config |
| :--- | :--- | :--- | :--- | :--- |
| **PostgreSQL 16** | `aiprogen_postgres` | `5434` | `5432` | DB: `aiprogen_db` \| User: `aiprogen` \| Pass: `aiprogen_secret` |
| **Redis 7** | `aiprogen_redis` | `6379` | `6379` | In-memory cache & job queue |
| **Spring Boot API** | `aiprogen_api` | `8080` | `8080` | REST API (`/swagger-ui.html`) |
| **Next.js Web UI** | `aiprogen_web` | `3000` | `3000` | Frontend web interface |
| **MinIO Storage** | `aiprogen_minio` | `9000` / `9001` | `9000` / `9001` | S3-compatible storage (`minioadmin` / `minioadminsecret`) |

---

## 🚀 Quick Start Commands

### 1. Database & Cache for Local API Development (Recommended)

When developing the Spring Boot API locally (`./gradlew bootRun`):

```bash
# 1. Navigate to API directory
cd ai-project-generator/apps/api

# 2. Start PostgreSQL and Redis containers in background
docker compose up -d postgres redis

# 3. Check status
docker ps
```

- PostgreSQL runs on `localhost:5434`.
- Redis runs on `localhost:6379`.

To stop local dev database services:
```bash
docker compose down
```

---

### 2. Full Application Stack (E2E / Docker Environment)

To run the complete system (Web, API, PostgreSQL, Redis, MinIO) inside Docker containers:

```bash
# Navigate to infrastructure docker directory
cd ai-project-generator/infrastructure/docker

# Start full stack
docker compose -f docker-compose.full.yml up -d --build
```

To stop full stack:
```bash
docker compose -f docker-compose.full.yml down
```

---

## 🛠️ Common Docker Commands

### Checking Logs & Container Health

```bash
# List all running containers
docker ps

# Stream logs for postgres
docker compose logs -f postgres

# Stream logs for all services
docker compose logs -f
```

### Restarting & Resetting Services

```bash
# Restart database container
docker compose restart postgres

# Stop containers and clear volumes (Fresh DB restart)
docker compose down -v
```

### Port Release (Kill Busy Port)

```bash
# Kill process running on port 8080
lsof -ti:8080 | xargs kill -9

# Kill process running on port 5434
lsof -ti:5434 | xargs kill -9
```

---

## 🔌 Database Client Connection Details (DBeaver / TablePlus / DataGrip)

- **Host**: `localhost`
- **Port**: `5434`
- **Database**: `aiprogen_db`
- **User**: `aiprogen`
- **Password**: `aiprogen_secret`
