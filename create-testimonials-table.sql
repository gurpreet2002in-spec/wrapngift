-- Create the testimonials (Client Logos) table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  role text,
  content text,
  image_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Create policies for public read and authenticated manage access
CREATE POLICY "Allow public read access on testimonials" 
  ON public.testimonials FOR SELECT 
  USING (true);

CREATE POLICY "Allow authenticated insert access on testimonials" 
  ON public.testimonials FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update access on testimonials" 
  ON public.testimonials FOR UPDATE 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete access on testimonials" 
  ON public.testimonials FOR DELETE 
  USING (auth.role() = 'authenticated');
