-- Create promotional_categories table
CREATE TABLE promotional_categories (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  banner TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create promotional_products table
CREATE TABLE promotional_products (
  id BIGSERIAL PRIMARY KEY,
  category_id TEXT NOT NULL REFERENCES promotional_categories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  price TEXT NOT NULL,
  image TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX idx_promo_products_category_id ON promotional_products(category_id);

-- Enable RLS (if needed, here we just allow public access for simplicity, matching the main setup if you have RLS)
-- ALTER TABLE promotional_categories ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE promotional_products ENABLE ROW LEVEL SECURITY;
