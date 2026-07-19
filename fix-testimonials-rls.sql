-- Drop the strict authenticated policies
DROP POLICY IF EXISTS "Allow authenticated insert access on testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Allow authenticated update access on testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Allow authenticated delete access on testimonials" ON public.testimonials;

-- Create policies that allow the frontend to manage them (since it uses a custom auth system)
CREATE POLICY "Allow anon insert access on testimonials" 
  ON public.testimonials FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow anon update access on testimonials" 
  ON public.testimonials FOR UPDATE 
  USING (true);

CREATE POLICY "Allow anon delete access on testimonials" 
  ON public.testimonials FOR DELETE 
  USING (true);
