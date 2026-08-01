-- Flyway Migration V4__remember_me.sql
-- Production-Grade Redis & Postgres Hybrid Remember Me Schema

CREATE TABLE IF NOT EXISTS remember_me_tokens (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    family_id VARCHAR(36) NOT NULL,
    token_hash VARCHAR(255) NOT NULL UNIQUE,
    device_id VARCHAR(100) NOT NULL,
    browser_fingerprint VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45),
    is_revoked BOOLEAN NOT NULL DEFAULT FALSE,
    is_used BOOLEAN NOT NULL DEFAULT FALSE,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_rem_tokens_user ON remember_me_tokens (user_id);
CREATE INDEX IF NOT EXISTS idx_rem_tokens_family ON remember_me_tokens (family_id);
CREATE INDEX IF NOT EXISTS idx_rem_tokens_hash ON remember_me_tokens (token_hash);
CREATE INDEX IF NOT EXISTS idx_rem_tokens_device ON remember_me_tokens (device_id);
