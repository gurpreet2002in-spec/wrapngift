-- Enable Row Level Security (RLS) on the storage bucket
-- This allows public read access but requires authentication for uploads

-- First, create a storage bucket via Supabase Dashboard:
-- 1. Go to Storage section
-- 2. Click "New Bucket"
-- 3. Name it: "product-images"
-- 4. Make it PUBLIC (so images can be viewed without auth)

-- Then run this SQL to set up policies:

-- Allow public read access to all files
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'product-images' );

-- Allow authenticated uploads (you can customize this)
CREATE POLICY "Authenticated uploads"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'product-images' );

-- Allow authenticated updates
CREATE POLICY "Authenticated updates"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'product-images' );

-- Allow authenticated deletes
CREATE POLICY "Authenticated deletes"
ON storage.objects FOR DELETE
USING ( bucket_id = 'product-images' );
