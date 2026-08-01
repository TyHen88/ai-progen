-- Flyway Database Schema Migration V1__init_schema.sql

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'ROLE_USER',
    avatar_url VARCHAR(500),
    credits INT NOT NULL DEFAULT 100,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projects (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    project_type VARCHAR(50) NOT NULL,
    frontend_stack VARCHAR(50),
    backend_stack VARCHAR(50),
    database_stack VARCHAR(50),
    status VARCHAR(50) NOT NULL DEFAULT 'READY',
    archive_url VARCHAR(500),
    stars_count INT DEFAULT 0,
    is_favorite BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS templates (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    badge VARCHAR(50),
    frontend VARCHAR(50),
    backend VARCHAR(50),
    database VARCHAR(50),
    downloads_count INT DEFAULT 0,
    stars_count INT DEFAULT 0,
    is_premium BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS generation_jobs (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) REFERENCES users(id) ON DELETE SET NULL,
    prompt TEXT NOT NULL,
    project_type VARCHAR(50) NOT NULL,
    frontend VARCHAR(50),
    backend VARCHAR(50),
    database VARCHAR(50),
    status VARCHAR(50) NOT NULL DEFAULT 'QUEUED',
    progress_percentage INT DEFAULT 0,
    error_message TEXT,
    result_project_id VARCHAR(36),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed Initial Starter Data (Admin Email: admin@aiprogen.io | Password: Password123!)
INSERT INTO users (id, email, password_hash, full_name, role, credits)
VALUES ('usr_admin_001', 'admin@aiprogen.io', '$2a$10$W23ZUX1Ykovp680daBqAs.kk7MS7Q/HrwjfS24VuJnVUOjPuZi4iO', 'System Admin', 'ROLE_ADMIN', 9999)
ON CONFLICT (email) DO NOTHING;
