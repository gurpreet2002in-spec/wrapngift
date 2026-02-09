-- Fix broken image URLs for products
-- Run this SQL in Supabase SQL Editor to update all product images with working URLs

-- Update Social/Festive products
UPDATE products SET image = 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=500' WHERE category_id = 'social' AND title = 'Diwali Gold Hamper';
UPDATE products SET image = 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=500' WHERE category_id = 'social' AND title = 'Housewarming Delight';
UPDATE products SET image = 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500' WHERE category_id = 'social' AND title = 'Tea Time Luxe';
UPDATE products SET image = 'https://images.unsplash.com/photo-1549989476-69a92fa57c36?w=500' WHERE category_id = 'social' AND title = 'Celebration Basket';
UPDATE products SET image = 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=500' WHERE category_id = 'social' AND title = 'Chocolate Indulgence';
UPDATE products SET image = 'https://images.unsplash.com/photo-1508736793122-f516e3ba5569?w=500' WHERE category_id = 'social' AND title = 'Dry Fruit Box';

-- Update Corporate products
UPDATE products SET image = 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500' WHERE category_id = 'corporate' AND title = 'Executive Leather Box';
UPDATE products SET image = 'https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=500' WHERE category_id = 'corporate' AND title = 'Gourmet Selection';
UPDATE products SET image = 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=500' WHERE category_id = 'corporate' AND title = 'Tech & Utility Kit';
UPDATE products SET image = 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500' WHERE category_id = 'corporate' AND title = 'Coffee Connoisseur';
UPDATE products SET image = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500' WHERE category_id = 'corporate' AND title = 'Wellness Hamper';
UPDATE products SET image = 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500' WHERE category_id = 'corporate' AND title = 'Desktop Essentials';

-- Update Wedding products
UPDATE products SET image = 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500' WHERE category_id = 'wedding' AND title = 'Royal Trousseau Trunk';
UPDATE products SET image = 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=500' WHERE category_id = 'wedding' AND title = 'Floral Invite Box';
UPDATE products SET image = 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500' WHERE category_id = 'wedding' AND title = 'Couple''s Spa Hamper';
UPDATE products SET image = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500' WHERE category_id = 'wedding' AND title = 'Heritage Sweet Box';
UPDATE products SET image = 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=500' WHERE category_id = 'wedding' AND title = 'Bride''s Essentials';
UPDATE products SET image = 'https://images.unsplash.com/photo-1585498443095-b8e6a550caae?w=500' WHERE category_id = 'wedding' AND title = 'Groom''s Grooming Kit';

-- Update Baby products
UPDATE products SET image = 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500' WHERE category_id = 'baby' AND title = 'Welcome Baby (Blue)';
UPDATE products SET image = 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=500' WHERE category_id = 'baby' AND title = 'Welcome Baby (Pink)';
UPDATE products SET image = 'https://images.unsplash.com/photo-1530325553241-4f6e7690cf36?w=500' WHERE category_id = 'baby' AND title = 'Soft Toy Hamper';
UPDATE products SET image = 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=500' WHERE category_id = 'baby' AND title = 'First Year Memory Box';
UPDATE products SET image = 'https://images.unsplash.com/photo-1519340333755-56e9c1d6a393?w=500' WHERE category_id = 'baby' AND title = 'Organic Cotton Set';
UPDATE products SET image = 'https://images.unsplash.com/photo-1560785477-d43d2b34e0df?w=500' WHERE category_id = 'baby' AND title = 'Baby Bath Essentials';
