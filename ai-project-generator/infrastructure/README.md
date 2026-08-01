# 🏗️ Infrastructure & DevOps Guide — AI Project Generator

Welcome to the **Infrastructure & DevOps** module. This directory contains all configurations, Docker Compose files, Kubernetes manifests, reverse proxy rules, and operational scripts required to build, deploy, and monitor the AI Project Generator.

---

## 📁 Infrastructure Structure

```
infrastructure/
├── docker/                 # Docker Compose configurations & container manifests
│   ├── docker-compose.full.yml   # Full stack (Web, API, DB, Redis, MinIO)
│   └── README.md                 # Detailed Docker guide
├── kubernetes/             # Kubernetes deployment manifests (Production)
├── nginx/                  # Nginx reverse proxy configurations
├── monitoring/             # Prometheus, Grafana, and tracing tools
├── scripts/                # Utility & automation scripts
├── AGENTS.md               # Infrastructure agent guidelines
└── README.md               # Infrastructure documentation (this file)
```

---

## 🐳 1. Docker Setup (`infrastructure/docker/`)

### Quick Local API Development (Postgres + Redis)

For backend development with `./gradlew bootRun` in `apps/api`:

```bash
cd ai-project-generator/apps/api
docker compose up -d postgres redis
```

- **PostgreSQL**: `localhost:5434` (Database: `aiprogen_db` | User: `aiprogen` | Pass: `aiprogen_secret`)
- **Redis**: `localhost:6379`

### Full Application Stack

Spin up all services (Next.js Web, Spring Boot API, PostgreSQL, Redis, MinIO):

```bash
cd ai-project-generator/infrastructure/docker
docker compose -f docker-compose.full.yml up -d --build
```

---

## 🌐 2. Nginx Reverse Proxy (`infrastructure/nginx/`)

Nginx routes external client traffic to internal microservices:
- `http://localhost/` -> `apps/web` (Next.js UI on port 3000)
- `http://localhost/api/` -> `apps/api` (Spring Boot API on port 8080)

---

## ☸️ 3. Kubernetes Manifests (`infrastructure/kubernetes/`)

Production deployments are orchestrated using Kubernetes manifests supporting:
- **Deployments & StatefulSets**: Stateful DB & Redis nodes, stateless API & Web pods.
- **ConfigMaps & Secrets**: Externalized configuration for staging and production environments.
- **Ingress Controller**: SSL/TLS termination and path-based routing.

---

## 📊 4. Monitoring & Observability (`infrastructure/monitoring/`)

- **Spring Boot Actuator**: Health check endpoints available at `/actuator/health`.
- **Prometheus Metrics**: Actuator metrics exposed at `/actuator/prometheus`.

---

## 📜 5. Automation Scripts (`infrastructure/scripts/`)

Operational helper scripts for database migrations, backup creation, and deployment validation:

```bash
# Make script executable before running
chmod +x infrastructure/scripts/*.sh
```

---

## ⚡ 6. Useful Port & Process Commands

### Kill Process on a Port (Port Release)

```bash
# Kill any process listening on port 8080 (API)
lsof -ti:8080 | xargs kill -9

# Kill any process listening on port 5434 (PostgreSQL)
lsof -ti:5434 | xargs kill -9
```

---

## 🔐 Security & Secrets Rules

- **No Hardcoded Secrets**: Production secrets must be passed via environment variables or Kubernetes Secrets.
- **IaC Standard**: All infrastructure changes must be documented via code commits rather than manual server changes.
