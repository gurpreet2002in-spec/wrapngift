-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT,
    content TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to read testimonials
CREATE POLICY "Allow public read testimonials" ON testimonials
    FOR SELECT USING (true);

-- Create policy to allow authenticated users to insert/update/delete testimonials
CREATE POLICY "Allow authenticated full access testimonials" ON testimonials
    FOR ALL USING (auth.role() = 'authenticated');
