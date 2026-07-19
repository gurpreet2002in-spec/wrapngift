-- Drop any existing policies on storage.objects for the product-images bucket
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated updates" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated deletes" ON storage.objects;
DROP POLICY IF EXISTS "Public Read Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Uploads" ON storage.objects;
DROP POLICY IF EXISTS "Public Updates" ON storage.objects;
DROP POLICY IF EXISTS "Public Deletes" ON storage.objects;

-- 1. Allow Public Read Access
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- 2. Allow Public Uploads (since auth is custom for admin panel)
CREATE POLICY "Public Uploads"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'product-images');

-- 3. Allow Public Updates
CREATE POLICY "Public Updates"
ON storage.objects FOR UPDATE
USING (bucket_id = 'product-images');

-- 4. Allow Public Deletes
CREATE POLICY "Public Deletes"
ON storage.objects FOR DELETE
USING (bucket_id = 'product-images');
