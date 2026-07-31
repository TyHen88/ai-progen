# Database Migration & Persistence Process

This document outlines the database persistence strategy, migration workflow, and connection pool configurations for PostgreSQL.

---

## 🐘 Persistence Infrastructure

- **Database System**: PostgreSQL 16+
- **ORM & Data Access**: Spring Data JPA / Hibernate 6
- **Migration Tool**: Flyway
- **Connection Pool**: HikariCP

---

## 📌 Migration & Schema Lifecycle

### 1. Flyway Migration Workflow
- All SQL DDL changes are versioned inside `apps/api/src/main/resources/db/migration/`.
- File naming convention: `V1__init_schema.sql`, `V2__add_index.sql`, etc.
- Flyway automatically validates and executes unapplied migrations on application startup before JPA initialization.

### 2. Hibernate Profile Modes
- **Dev Profile (`application-dev.yml`)**: `spring.jpa.hibernate.ddl-auto: update`
  - Allows seamless table creation during local feature development while syncing with Flyway logs.
- **Prod Profile (`application-prod.yml`)**: `spring.jpa.hibernate.ddl-auto: validate`
  - Ensures production databases strictly enforce Flyway migration scripts without runtime schema alterations.

### 3. HikariCP Connection Pool Config
```yaml
spring:
  datasource:
    hikari:
      maximum-pool-size: 10
      minimum-idle: 2
      idle-timeout: 300000
      connection-timeout: 20000
```
- Manages high-throughput concurrency and prevents connection leaks.
