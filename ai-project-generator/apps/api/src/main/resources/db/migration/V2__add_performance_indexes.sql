-- Flyway Migration V2__add_performance_indexes.sql
-- Performance Indexes for Paginated, Sorted, and Filtered Queries

-- Index for user's projects listing ordered by created_at DESC
CREATE INDEX IF NOT EXISTS idx_projects_user_created ON projects (user_id, created_at DESC);

-- Index for filtering projects by project_type and favorite status
CREATE INDEX IF NOT EXISTS idx_projects_type_fav ON projects (project_type, is_favorite);

-- Index for templates category and popularity sorting
CREATE INDEX IF NOT EXISTS idx_templates_cat_downloads ON templates (category, downloads_count DESC);

-- Index for generation jobs by user and status
CREATE INDEX IF NOT EXISTS idx_generation_jobs_user_status ON generation_jobs (user_id, status);
