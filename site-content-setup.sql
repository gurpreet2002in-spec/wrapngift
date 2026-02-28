-- ============================================================
-- site_content table: Stores all editable website content
-- Each row = one content "key" with a JSON value
-- ============================================================

CREATE TABLE IF NOT EXISTS site_content (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  section TEXT NOT NULL,  -- e.g. 'hero', 'about_home', 'services', 'about_page', 'stats'
  label TEXT,             -- Human-readable label for admin UI
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read site content (public)
CREATE POLICY "Public read site_content" ON site_content
  FOR SELECT USING (true);

-- Allow authenticated users to update site content
CREATE POLICY "Authenticated update site_content" ON site_content
  FOR ALL USING (true);

-- ============================================================
-- Seed default content values
-- ============================================================

-- HERO SECTION
INSERT INTO site_content (key, value, section, label) VALUES
('hero_badge', '"Premium Gifting Solutions"', 'hero', 'Hero Badge Text'),
('hero_title_line1', '"Curated"', 'hero', 'Hero Title Line 1'),
('hero_title_highlight', '"Bespoke"', 'hero', 'Hero Title Highlight Word'),
('hero_title_line2', '"Hampers"', 'hero', 'Hero Title Line 2'),
('hero_subtitle', '"Elevate your celebrations with hand-picked elegance. We craft memories, one thoughtfully curated hamper at a time."', 'hero', 'Hero Subtitle'),
('hero_cta_primary', '"Explore Collections"', 'hero', 'Hero Primary CTA Button'),
('hero_cta_secondary', '"Read Our Story"', 'hero', 'Hero Secondary CTA Button'),
('hero_image', '"https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1920&q=80"', 'hero', 'Hero Background Image')
ON CONFLICT (key) DO NOTHING;

-- ABOUT SECTION (Homepage snippet)
INSERT INTO site_content (key, value, section, label) VALUES
('about_home_title', '"A Legacy of Thoughtful Gifting"', 'about_home', 'About Section Title'),
('about_home_title_highlight', '"Thoughtful Gifting"', 'about_home', 'About Title Highlighted Words'),
('about_home_para1', '"Established with a passion for celebrating relationships, Wrap and Pack Gifting creates bespoke experiences that linger in memory long after the occasion has passed."', 'about_home', 'About Paragraph 1'),
('about_home_para2', '"We specialize in crafting memorable moments through creative excellence and meticulous attention to detail. From grand weddings to intimate corporate events, and every milestone in between, we are your trusted partner in expressing gratitude and love."', 'about_home', 'About Paragraph 2'),
('about_home_stat1_number', '"5+"', 'about_home', 'Stat 1 - Number'),
('about_home_stat1_label', '"Years of Experience"', 'about_home', 'Stat 1 - Label'),
('about_home_stat2_number', '"1000+"', 'about_home', 'Stat 2 - Number'),
('about_home_stat2_label', '"Happy Clients"', 'about_home', 'Stat 2 - Label'),
('about_home_image', '"https://images.unsplash.com/photo-1512413914633-b5043f4041ea?q=80&w=1000&auto=format&fit=crop"', 'about_home', 'About Section Image')
ON CONFLICT (key) DO NOTHING;

-- SERVICES SECTION (Homepage)
INSERT INTO site_content (key, value, section, label) VALUES
('services_section_title', '"Our Collections"', 'services', 'Services Section Title'),
('services_section_subtitle', '"Discover our range of meticulously crafted gifting solutions designed to make every occasion memorable."', 'services', 'Services Section Subtitle'),
('services_cards', '[
  {
    "id": "corporate",
    "title": "Corporate Gifting",
    "description": "Elevate your business relationships with our bespoke corporate hampers. Perfect for clients, employees, and partners.",
    "image": "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&q=80&w=1000",
    "icon": "Gift"
  },
  {
    "id": "wedding",
    "title": "Wedding Trousseau",
    "description": "Add a touch of elegance to your special day with our exquisite wedding favors and trousseau packing.",
    "image": "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1000",
    "icon": "Heart"
  },
  {
    "id": "social",
    "title": "Festive & Social",
    "description": "Celebrate life''s moments with our curated social gifting solutions. From Diwali to housewarmings.",
    "image": "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=1000",
    "icon": "Calendar"
  },
  {
    "id": "baby",
    "title": "Baby Announcements",
    "description": "Welcome the little one with adorable and thoughtful hampers that spread joy and warmth.",
    "image": "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=1000",
    "icon": "Baby"
  }
]', 'services', 'Services Cards (JSON Array)')
ON CONFLICT (key) DO NOTHING;

-- ABOUT US PAGE
INSERT INTO site_content (key, value, section, label) VALUES
('aboutpage_hero_badge', '"Our Story"', 'about_page', 'Hero Badge'),
('aboutpage_hero_title', '"Crafting Emotions into Bespoke Gifts"', 'about_page', 'Hero Title'),
('aboutpage_hero_image', '"https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=2070&auto=format&fit=crop"', 'about_page', 'Hero Background Image'),
('aboutpage_vision_title', '"More than just a hamper, it''s a memory."', 'about_page', 'Vision Section Title'),
('aboutpage_vision_quote', '"At Wrap n Pack, we believe that the best gifts are those that evoke a feeling. Every ribbon tied and every product selected is done with a single purpose: to make your loved ones feel special."', 'about_page', 'Vision Quote'),
('aboutpage_vision_para', '"Born from a passion for aesthetics and a love for celebrations, Wrap n Pack was founded to fill the gap between generic gifts and truly personalized hampers. We source the finest delicacies, the most elegant accessories, and the most durable packaging to ensure that your gift is a masterpiece."', 'about_page', 'Vision Paragraph'),
('aboutpage_vision_image', '"https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2040&auto=format&fit=crop"', 'about_page', 'Vision Section Image'),
('aboutpage_promise_title', '"The Wrap n Pack Promise"', 'about_page', 'Promise Section Title'),
('aboutpage_values', '[
  {"icon": "Heart", "title": "Curated with Love", "desc": "Every item in our hampers is hand-picked to ensure it meets our high standards of quality and emotion."},
  {"icon": "ShieldCheck", "title": "Premium Quality", "desc": "We never compromise. From the box material to the finest chocolates, everything is premium."},
  {"icon": "Sparkles", "title": "Bespoke Design", "desc": "Unique layouts tailored to your occasion, whether it''s a wedding, corporate event, or a personal milestone."}
]', 'about_page', 'Core Values (JSON Array)')
ON CONFLICT (key) DO NOTHING;

-- STATS SECTION (About Us page)
INSERT INTO site_content (key, value, section, label) VALUES
('stats', '[
  {"number": "500+", "label": "Happy Clients"},
  {"number": "2k+", "label": "Hampers Delivered"},
  {"number": "15+", "label": "Corporate Partners"},
  {"number": "4.9/5", "label": "Average Rating"}
]', 'stats', 'Statistics (JSON Array)')
ON CONFLICT (key) DO NOTHING;

-- CONTACT SECTION
INSERT INTO site_content (key, value, section, label) VALUES
('contact_whatsapp', '"7588900505"', 'contact', 'WhatsApp Number'),
('contact_email', '"wrapnpack@gmail.com"', 'contact', 'Contact Email'),
('contact_address', '"Pune, Maharashtra, India"', 'contact', 'Business Address')
ON CONFLICT (key) DO NOTHING;
