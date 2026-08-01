-- Flyway Migration V3__refresh_tokens.sql
-- Production-Ready Stateful Refresh Token & Replay Detection Schema

CREATE TABLE IF NOT EXISTS refresh_tokens (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    family_id VARCHAR(36) NOT NULL,
    token_hash VARCHAR(255) NOT NULL UNIQUE,
    device_info VARCHAR(255),
    ip_address VARCHAR(45),
    is_revoked BOOLEAN NOT NULL DEFAULT FALSE,
    is_used BOOLEAN NOT NULL DEFAULT FALSE,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_ref_tokens_user ON refresh_tokens (user_id);
CREATE INDEX IF NOT EXISTS idx_ref_tokens_family ON refresh_tokens (family_id);
CREATE INDEX IF NOT EXISTS idx_ref_tokens_hash ON refresh_tokens (token_hash);
