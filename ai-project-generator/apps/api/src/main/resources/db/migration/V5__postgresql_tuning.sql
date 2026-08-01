-- Flyway Migration V5__postgresql_tuning.sql
-- Production-Grade PostgreSQL Index Tuning, Partial Indexing, GIN Trigram Search & Materialized View

-- 1. Enable Trigram Extension for Fast Substring Search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- 2. GIN Trigram Indexes for Substring Filtering (ILIKE '%search%')
CREATE INDEX IF NOT EXISTS idx_templates_trgm ON templates USING gin (title gin_trgm_ops, description gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_projects_trgm ON projects USING gin (name gin_trgm_ops, description gin_trgm_ops);

-- 3. Partial Indexes for Active Tokens (Excludes Revoked & Used Rows for ~90% RAM Index Reduction)
CREATE INDEX IF NOT EXISTS idx_active_refresh_tokens ON refresh_tokens (token_hash) WHERE is_revoked = FALSE AND is_used = FALSE;
CREATE INDEX IF NOT EXISTS idx_active_remember_me_tokens ON remember_me_tokens (token_hash) WHERE is_revoked = FALSE AND is_used = FALSE;

-- 4. Materialized View for O(1) Admin Dashboard Analytics
CREATE MATERIALIZED VIEW IF NOT EXISTS mv_admin_stats AS
SELECT 
    (SELECT COUNT(*) FROM users) AS total_users,
    (SELECT COUNT(*) FROM projects) AS total_projects,
    (SELECT COUNT(*) FROM generation_jobs) AS total_jobs,
    (SELECT COUNT(*) FROM generation_jobs WHERE status = 'COMPLETED') AS completed_jobs,
    (SELECT COUNT(*) FROM generation_jobs WHERE status = 'FAILED') AS failed_jobs,
    (SELECT COUNT(*) FROM generation_jobs WHERE status = 'QUEUED') AS queued_jobs,
    CURRENT_TIMESTAMP AS last_refreshed_at;

CREATE UNIQUE INDEX IF NOT EXISTS idx_mv_admin_stats_time ON mv_admin_stats (last_refreshed_at);
