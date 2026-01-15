-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ANALYTICS TABLES
-- ============================================

-- Page views tracking
CREATE TABLE IF NOT EXISTS page_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_path TEXT NOT NULL,
  page_title TEXT,
  referrer TEXT,
  user_agent TEXT,
  ip_address INET,
  session_id TEXT,
  country TEXT,
  city TEXT,
  device_type TEXT,
  browser TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User events tracking (clicks, form submissions, etc.)
CREATE TABLE IF NOT EXISTS user_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type TEXT NOT NULL, -- 'click', 'form_submit', 'download', 'scroll', etc.
  event_name TEXT NOT NULL,
  element_id TEXT,
  element_type TEXT,
  page_path TEXT NOT NULL,
  session_id TEXT,
  user_agent TEXT,
  ip_address INET,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sessions tracking
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT UNIQUE NOT NULL,
  user_agent TEXT,
  ip_address INET,
  country TEXT,
  city TEXT,
  device_type TEXT,
  browser TEXT,
  first_visit TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  page_count INTEGER DEFAULT 1,
  duration_seconds INTEGER DEFAULT 0,
  is_bounce BOOLEAN DEFAULT true
);

-- ============================================
-- CONTENT TABLES (Migrated from mocked data)
-- ============================================

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id INTEGER UNIQUE NOT NULL,
  category TEXT NOT NULL,
  img TEXT NOT NULL,
  link TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  technologies JSONB NOT NULL, -- Array of {label, color, width}
  button TEXT DEFAULT 'View Project',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Experience table
CREATE TABLE IF NOT EXISTS experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  experience_id INTEGER UNIQUE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('work', 'education')),
  icon_name TEXT NOT NULL, -- Store icon identifier
  icon_size INTEGER DEFAULT 32,
  color TEXT NOT NULL,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  period TEXT NOT NULL,
  description TEXT NOT NULL,
  technologies TEXT[] DEFAULT '{}',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id INTEGER UNIQUE NOT NULL,
  title TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  icon_size INTEGER DEFAULT 32,
  color TEXT NOT NULL,
  description TEXT NOT NULL,
  features TEXT[] DEFAULT '{}',
  keywords TEXT[] DEFAULT '{}',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id INTEGER UNIQUE NOT NULL,
  name TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  icon_size INTEGER DEFAULT 32,
  color TEXT NOT NULL,
  description TEXT NOT NULL,
  link TEXT NOT NULL,
  button TEXT DEFAULT 'View Profile',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  testimonial_id TEXT UNIQUE NOT NULL,
  client_name TEXT NOT NULL,
  client_role TEXT NOT NULL,
  client_company TEXT,
  client_image TEXT,
  platform TEXT,
  platform_url TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  testimonial TEXT NOT NULL,
  date TEXT,
  project_type TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact form submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  ip_address INET,
  user_agent TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ADMIN USERS TABLE (for dashboard access)
-- ============================================

-- This will use Supabase Auth users, but we can add additional metadata
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- ============================================
-- ANALYTICS POLICIES (Public insert, Admin read)
-- ============================================

-- Page views: Anyone can insert, only admins can read
CREATE POLICY "Allow public insert on page_views"
  ON page_views FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow admin read on page_views"
  ON page_views FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.is_active = true
    )
  );

CREATE POLICY "Allow admin delete on page_views"
  ON page_views FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.is_active = true
    )
  );

-- User events: Anyone can insert, only admins can read
CREATE POLICY "Allow public insert on user_events"
  ON user_events FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow admin read on user_events"
  ON user_events FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.is_active = true
    )
  );

CREATE POLICY "Allow admin delete on user_events"
  ON user_events FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.is_active = true
    )
  );

-- Sessions: Anyone can insert/update, only admins can read
CREATE POLICY "Allow public insert on sessions"
  ON sessions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow public update on sessions"
  ON sessions FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow admin read on sessions"
  ON sessions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.is_active = true
    )
  );

-- ============================================
-- CONTENT POLICIES (Public read, Admin write)
-- ============================================

-- Projects: Public read, Admin write
CREATE POLICY "Allow public read on projects"
  ON projects FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Allow admin write on projects"
  ON projects FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.is_active = true
    )
  );

-- Experiences: Public read, Admin write
CREATE POLICY "Allow public read on experiences"
  ON experiences FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Allow admin write on experiences"
  ON experiences FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.is_active = true
    )
  );

-- Services: Public read, Admin write
CREATE POLICY "Allow public read on services"
  ON services FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Allow admin write on services"
  ON services FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.is_active = true
    )
  );

-- Profiles: Public read, Admin write
CREATE POLICY "Allow public read on profiles"
  ON profiles FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Allow admin write on profiles"
  ON profiles FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.is_active = true
    )
  );

-- Testimonials: Public read, Admin write
CREATE POLICY "Allow public read on testimonials"
  ON testimonials FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Allow admin write on testimonials"
  ON testimonials FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.is_active = true
    )
  );

-- Contact submissions: Public insert, Admin read
CREATE POLICY "Allow public insert on contact_submissions"
  ON contact_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow admin read on contact_submissions"
  ON contact_submissions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.is_active = true
    )
  );

CREATE POLICY "Allow admin update on contact_submissions"
  ON contact_submissions FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.is_active = true
    )
  );

-- ============================================
-- ADMIN USERS POLICIES
-- ============================================

-- Admin users: Allow authenticated users to read their own record
-- This avoids circular dependency in RLS policies
CREATE POLICY "Allow users to read own admin_users record"
  ON admin_users FOR SELECT
  TO authenticated
  USING (id = auth.uid());

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

-- Analytics indexes
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_page_path ON page_views(page_path);
CREATE INDEX IF NOT EXISTS idx_page_views_country ON page_views(country);
CREATE INDEX IF NOT EXISTS idx_page_views_city ON page_views(city);
CREATE INDEX IF NOT EXISTS idx_user_events_created_at ON user_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_events_event_type ON user_events(event_type);
CREATE INDEX IF NOT EXISTS idx_sessions_session_id ON sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_sessions_first_visit ON sessions(first_visit DESC);
CREATE INDEX IF NOT EXISTS idx_sessions_country ON sessions(country);
CREATE INDEX IF NOT EXISTS idx_sessions_city ON sessions(city);

-- Content indexes
CREATE INDEX IF NOT EXISTS idx_projects_display_order ON projects(display_order);
CREATE INDEX IF NOT EXISTS idx_experiences_display_order ON experiences(display_order);
CREATE INDEX IF NOT EXISTS idx_services_display_order ON services(display_order);
CREATE INDEX IF NOT EXISTS idx_profiles_display_order ON profiles(display_order);
CREATE INDEX IF NOT EXISTS idx_testimonials_display_order ON testimonials(display_order);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_experiences_updated_at
  BEFORE UPDATE ON experiences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to track page view and update session
CREATE OR REPLACE FUNCTION track_page_view(
  p_page_path TEXT,
  p_page_title TEXT DEFAULT NULL,
  p_referrer TEXT DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL,
  p_session_id TEXT DEFAULT NULL,
  p_ip_address INET DEFAULT NULL,
  p_country TEXT DEFAULT NULL,
  p_city TEXT DEFAULT NULL,
  p_device_type TEXT DEFAULT NULL,
  p_browser TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_id UUID;
BEGIN
  -- Insert page view with all fields
  INSERT INTO page_views (
    page_path, 
    page_title, 
    referrer, 
    user_agent, 
    session_id,
    ip_address,
    country,
    city,
    device_type,
    browser
  )
  VALUES (
    p_page_path, 
    p_page_title, 
    p_referrer, 
    p_user_agent, 
    p_session_id,
    p_ip_address,
    p_country,
    p_city,
    p_device_type,
    p_browser
  )
  RETURNING id INTO v_id;

  -- Update or create session with location and device info
  IF p_session_id IS NOT NULL THEN
    INSERT INTO sessions (
      session_id, 
      user_agent, 
      ip_address,
      country,
      city,
      device_type,
      browser,
      last_activity, 
      page_count
    )
    VALUES (
      p_session_id, 
      p_user_agent,
      p_ip_address,
      p_country,
      p_city,
      p_device_type,
      p_browser,
      NOW(), 
      1
    )
    ON CONFLICT (session_id) DO UPDATE
    SET last_activity = NOW(),
        page_count = sessions.page_count + 1,
        duration_seconds = EXTRACT(EPOCH FROM (NOW() - sessions.first_visit))::INTEGER,
        is_bounce = false,
        -- Update location/device info if not already set
        ip_address = COALESCE(sessions.ip_address, p_ip_address),
        country = COALESCE(sessions.country, p_country),
        city = COALESCE(sessions.city, p_city),
        device_type = COALESCE(sessions.device_type, p_device_type),
        browser = COALESCE(sessions.browser, p_browser);
  END IF;

  RETURN v_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
