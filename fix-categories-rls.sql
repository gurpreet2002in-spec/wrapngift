-- Enable RLS for categories and products
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist so we can recreate them clean
DROP POLICY IF EXISTS "Public read categories" ON categories;
DROP POLICY IF EXISTS "Authenticated update categories" ON categories;
DROP POLICY IF EXISTS "Public read products" ON products;
DROP POLICY IF EXISTS "Authenticated update products" ON products;

-- 1. Policies for Categories
-- Allow anyone to read categories (public)
CREATE POLICY "Public read categories" ON categories
  FOR SELECT USING (true);

-- Allow anyone to modify categories (since auth is custom)
CREATE POLICY "Public all categories" ON categories
  FOR ALL USING (true);


-- 2. Policies for Products
-- Allow anyone to read products (public)
CREATE POLICY "Public read products" ON products
  FOR SELECT USING (true);

-- Allow anyone to modify products (since auth is custom)
CREATE POLICY "Public all products" ON products
  FOR ALL USING (true);
