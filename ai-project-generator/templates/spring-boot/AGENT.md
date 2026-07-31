# AGENT.md — templates/spring-boot

## Purpose
**Spring Boot Template** — Scaffolding for a production-ready Spring Boot REST API project.

## Includes
- Spring Boot 3.x project structure
- JPA / Hibernate with PostgreSQL
- Spring Security + JWT authentication
- Flyway database migrations
- Docker and Docker Compose support
- Swagger / OpenAPI documentation
- Unit and integration test setup

## Variables
| Variable | Description |
|----------|-------------|
| `PROJECT_NAME` | Artifact ID / project name |
| `GROUP_ID` | Maven group ID |
| `JAVA_VERSION` | Java version (17, 21) |
| `DB_NAME` | Database name |

## Agent Guidelines
- Follow Spring Boot best practices (layered architecture).
- Include `.env.example` for all required environment variables.
