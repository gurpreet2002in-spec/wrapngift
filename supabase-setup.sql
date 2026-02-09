-- Create categories table
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  banner TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table
CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  category_id TEXT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  price TEXT NOT NULL,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX idx_products_category_id ON products(category_id);

-- Insert initial category data
INSERT INTO categories (id, title, subtitle, description, banner) VALUES
('corporate', 'Corporate Gifting', 'Professional Excellence', 'Elevate your brand with premium, customized corporate hampers. Perfect for clients, employees, and events.', 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2040&auto=format&fit=crop'),
('wedding', 'Wedding Trousseau', 'A Love Story', 'Elegant packing for the most special day of your life. Trousseau trunks, invite hampers, and room gifts crafted with perfection.', 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1000'),
('social', 'Festive & Social', 'Celebrate Life', 'Thoughtful gifts for every occasion—Diwali, Christmas, Housewarming, and Birthdays. Spread joy with our festive collection.', 'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=1000'),
('baby', 'Baby Announcements', 'Little Miracles', 'Welcome the little one with our adorable baby hampers. Perfect for announcements, baby showers, and first birthdays.', 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=1000');

-- Insert initial products for corporate
INSERT INTO products (category_id, title, price, image) VALUES
('corporate', 'Executive Leather Box', '₹3,500', 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2040&auto=format&fit=crop'),
('corporate', 'Gourmet Selection', '₹2,800', 'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=1000'),
('corporate', 'Tech & Utility Kit', '₹1,500', 'https://images.unsplash.com/photo-1550005809-91a759055259?auto=format&fit=crop&q=80&w=1000'),
('corporate', 'Coffee Connoisseur', '₹2,200', 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=1000'),
('corporate', 'Wellness Hamper', '₹3,000', 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=1000'),
('corporate', 'Desktop Essentials', '₹1,800', 'https://images.unsplash.com/photo-1491975474562-1f4e30bc9468?auto=format&fit=crop&q=80&w=1000');

-- Insert products for wedding
INSERT INTO products (category_id, title, price, image) VALUES
('wedding', 'Royal Trousseau Trunk', 'Custom', 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1000'),
('wedding', 'Floral Invite Box', 'Custom', 'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&q=80&w=1000'),
('wedding', 'Couple''s Spa Hamper', 'Custom', 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=1000'),
('wedding', 'Heritage Sweet Box', 'Custom', 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=2070&auto=format&fit=crop'),
('wedding', 'Bride''s Essentials', 'Custom', 'https://images.unsplash.com/photo-1525268323814-8780a1cff6e9?auto=format&fit=crop&q=80&w=1000'),
('wedding', 'Groom''s Grooming Kit', 'Custom', 'https://images.unsplash.com/photo-1621600411688-4be93cd68504?auto=format&fit=crop&q=80&w=1000');

-- Insert products for social
INSERT INTO products (category_id, title, price, image) VALUES
('social', 'Diwali Gold Hamper', '₹4,000', 'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=1000'),
('social', 'Housewarming Delight', '₹3,200', 'https://images.unsplash.com/photo-1484156885344-93dd3cbdf449?auto=format&fit=crop&q=80&w=1000'),
('social', 'Tea Time Luxe', '₹2,100', 'https://images.unsplash.com/photo-1550955295-a2268753239a?auto=format&fit=crop&q=80&w=1000'),
('social', 'Celebration Basket', '₹5,500', 'https://images.unsplash.com/photo-1563245372-f21727329f6d?auto=format&fit=crop&q=80&w=1000'),
('social', 'Chocolate Indulgence', '₹2,500', 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&q=80&w=1000'),
('social', 'Dry Fruit Box', '₹1,800', 'https://images.unsplash.com/photo-1596522354195-e84e941e6d98?auto=format&fit=crop&q=80&w=1000');

-- Insert products for baby
INSERT INTO products (category_id, title, price, image) VALUES
('baby', 'Welcome Baby (Blue)', 'Custom', 'https://images.unsplash.com/photo-1596207123985-78c2e6f4770d?auto=format&fit=crop&q=80&w=1000'),
('baby', 'Welcome Baby (Pink)', 'Custom', 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=1000'),
('baby', 'Soft Toy Hamper', '₹2,500', 'https://images.unsplash.com/photo-1555529771-835f59e65e80?auto=format&fit=crop&q=80&w=1000'),
('baby', 'First Year Memory Box', '₹3,000', 'https://images.unsplash.com/photo-1606103920295-9a091573f160?auto=format&fit=crop&q=80&w=1000'),
('baby', 'Organic Cotton Set', '₹3,500', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1000'),
('baby', 'Baby Bath Essentials', '₹2,200', 'https://images.unsplash.com/photo-1556228149-d8f635694f81?auto=format&fit=crop&q=80&w=1000');
