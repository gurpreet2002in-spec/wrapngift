-- Add description column to products table
-- Run this SQL in Supabase SQL Editor

ALTER TABLE products ADD COLUMN description TEXT;

-- Optionally, add some sample descriptions to existing products
UPDATE products SET description = 'Premium leather gift box perfect for corporate gifting. Includes customized branding options.' WHERE category_id = 'corporate' AND title = 'Executive Leather Box';
UPDATE products SET description = 'Curated selection of gourmet treats and delicacies. Perfect for clients and business partners.' WHERE category_id = 'corporate' AND title = 'Gourmet Selection';
UPDATE products SET description = 'Essential tech accessories and office utilities in a premium package.' WHERE category_id = 'corporate' AND title = 'Tech & Utility Kit';
UPDATE products SET description = 'Premium coffee beans and brewing accessories for the coffee enthusiast.' WHERE category_id = 'corporate' AND title = 'Coffee Connoisseur';
UPDATE products SET description = 'Health and wellness products to promote employee well-being.' WHERE category_id = 'corporate' AND title = 'Wellness Hamper';
UPDATE products SET description = 'Modern desk accessories to enhance any workspace.' WHERE category_id = 'corporate' AND title = 'Desktop Essentials';

UPDATE products SET description = 'Luxurious trousseau trunk with traditional craftsmanship. Custom sizing available.' WHERE category_id = 'wedding' AND title = 'Royal Trousseau Trunk';
UPDATE products SET description = 'Beautiful floral arrangements in designer invitation boxes.' WHERE category_id = 'wedding' AND title = 'Floral Invite Box';
UPDATE products SET description = 'Luxurious spa products for the newlyweds to enjoy together.' WHERE category_id = 'wedding' AND title = 'Couple''s Spa Hamper';
UPDATE products SET description = 'Traditional Indian sweets in an elegant heritage-inspired box.' WHERE category_id = 'wedding' AND title = 'Heritage Sweet Box';
UPDATE products SET description = 'Complete essentials kit for the bride on her special day.' WHERE category_id = 'wedding' AND title = 'Bride''s Essentials';
UPDATE products SET description = 'Premium grooming products for the modern groom.' WHERE category_id = 'wedding' AND title = 'Groom''s Grooming Kit';

UPDATE products SET description = 'Festive hamper with traditional Diwali treats and decorative items.' WHERE category_id = 'social' AND title = 'Diwali Gold Hamper';
UPDATE products SET description = 'Thoughtful collection of home essentials for new homeowners.' WHERE category_id = 'social' AND title = 'Housewarming Delight';
UPDATE products SET description = 'Premium tea collection with elegant serving accessories.' WHERE category_id = 'social' AND title = 'Tea Time Luxe';
UPDATE products SET description = 'Grand celebration basket with gourmet treats and party essentials.' WHERE category_id = 'social' AND title = 'Celebration Basket';
UPDATE products SET description = 'Decadent chocolate collection from premium artisan chocolatiers.' WHERE category_id = 'social' AND title = 'Chocolate Indulgence';
UPDATE products SET description = 'Assorted premium dry fruits in an elegant presentation box.' WHERE category_id = 'social' AND title = 'Dry Fruit Box';

UPDATE products SET description = 'Complete welcome kit for baby boy with soft toys and essentials.' WHERE category_id = 'baby' AND title = 'Welcome Baby (Blue)';
UPDATE products SET description = 'Complete welcome kit for baby girl with soft toys and essentials.' WHERE category_id = 'baby' AND title = 'Welcome Baby (Pink)';
UPDATE products SET description = 'Cuddly soft toys and plush animals for your little one.' WHERE category_id = 'baby' AND title = 'Soft Toy Hamper';
UPDATE products SET description = 'Beautiful keepsake box to preserve precious first-year memories.' WHERE category_id = 'baby' AND title = 'First Year Memory Box';
UPDATE products SET description = '100% organic cotton clothing and accessories for sensitive baby skin.' WHERE category_id = 'baby' AND title = 'Organic Cotton Set';
UPDATE products SET description = 'Gentle, hypoallergenic bath products specially formulated for babies.' WHERE category_id = 'baby' AND title = 'Baby Bath Essentials';
