-- Enable RLS on all tables
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_categories ENABLE ROW LEVEL SECURITY;

-- AUTHORS POLICIES
DROP POLICY IF EXISTS "Public authors are viewable by everyone" ON authors;
CREATE POLICY "Public authors are viewable by everyone" 
ON authors FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage authors" ON authors;
CREATE POLICY "Authenticated users can manage authors" 
ON authors FOR ALL 
USING (auth.role() = 'authenticated');

-- POSTS POLICIES
DROP POLICY IF EXISTS "Public posts are viewable by everyone" ON posts;
CREATE POLICY "Public posts are viewable by everyone" 
ON posts FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage posts" ON posts;
CREATE POLICY "Authenticated users can manage posts" 
ON posts FOR ALL 
USING (auth.role() = 'authenticated');

-- CATEGORIES POLICIES
DROP POLICY IF EXISTS "Public categories are viewable by everyone" ON categories;
CREATE POLICY "Public categories are viewable by everyone" 
ON categories FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage categories" ON categories;
CREATE POLICY "Authenticated users can manage categories" 
ON categories FOR ALL 
USING (auth.role() = 'authenticated');

-- POST_CATEGORIES POLICIES
DROP POLICY IF EXISTS "Public post_categories are viewable by everyone" ON post_categories;
CREATE POLICY "Public post_categories are viewable by everyone" 
ON post_categories FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage post_categories" ON post_categories;
CREATE POLICY "Authenticated users can manage post_categories" 
ON post_categories FOR ALL 
USING (auth.role() = 'authenticated');
