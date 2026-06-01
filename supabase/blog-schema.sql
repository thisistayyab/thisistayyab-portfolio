-- Blog tables for Tayyab portfolio (reference — apply in Supabase SQL editor)
-- See portfolio old/supabase_schema.sql for full definitions.

-- Admin users: id must match Supabase Auth user UUID
-- CREATE TABLE admin_users (
--   id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
--   email TEXT,
--   is_active BOOLEAN DEFAULT true,
--   last_login TIMESTAMPTZ,
--   created_at TIMESTAMPTZ DEFAULT NOW()
-- );

-- Public read policies + authenticated admin write policies must be configured in Supabase
-- for posts, authors, categories, and post_categories.
