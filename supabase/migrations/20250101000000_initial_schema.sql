/*
# [Initial Schema Setup for Zia Crochet]
This script sets up the initial database structure for the Zia Crochet application. It includes tables for products and delivered works, configures file storage for images, and establishes Row Level Security (RLS) policies to protect the data.

## Query Description:
This is a foundational script and is safe to run on a new project. It creates new tables and storage buckets without altering or deleting existing data. It enables Row Level Security to ensure that write operations (create, update, delete) are restricted to authenticated users (the admin), while read operations are public.

## Metadata:
- Schema-Category: "Structural"
- Impact-Level: "Low"
- Requires-Backup: false
- Reversible: true (by dropping the created tables and policies)

## Structure Details:
- Tables Created: `products`, `delivered_works`
- Storage Buckets Created: `product-images`
- RLS Policies Added: Public read and authenticated write access for both tables.
- Storage Policies Added: Public read and authenticated write access for the bucket.

## Security Implications:
- RLS Status: Enabled on `products` and `delivered_works`.
- Policy Changes: Yes, new policies are created.
- Auth Requirements: Operations like INSERT, UPDATE, DELETE will require an authenticated user session.

## Performance Impact:
- Indexes: Primary keys are automatically indexed. No other custom indexes are added at this stage.
- Triggers: None.
- Estimated Impact: Low. The setup is standard and should not cause performance issues.
*/

-- 1. Create the 'products' table
CREATE TABLE public.products (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    name text NOT NULL,
    description text,
    size text,
    price_range text,
    images text[]
);
COMMENT ON TABLE public.products IS 'Stores the crochet products available for sale.';

-- 2. Create the 'delivered_works' table
CREATE TABLE public.delivered_works (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    product_name text NOT NULL,
    image_url text,
    client_name text
);
COMMENT ON TABLE public.delivered_works IS 'Stores examples of delivered works for the portfolio carousel.';

-- 3. Create a bucket for product images in Supabase Storage
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;
COMMENT ON BUCKET "product-images" IS 'Stores all images for products and delivered works.';

-- 4. Enable Row Level Security (RLS) for the tables
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivered_works ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS policies for the 'products' table
-- Allow public read access
CREATE POLICY "Allow public read access on products"
ON public.products
FOR SELECT
USING (true);

-- Allow authenticated users (admin) full access
CREATE POLICY "Allow full access for authenticated users on products"
ON public.products
FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- 6. Create RLS policies for the 'delivered_works' table
-- Allow public read access
CREATE POLICY "Allow public read access on delivered_works"
ON public.delivered_works
FOR SELECT
USING (true);

-- Allow authenticated users (admin) full access
CREATE POLICY "Allow full access for authenticated users on delivered_works"
ON public.delivered_works
FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- 7. Create Storage policies for the 'product-images' bucket
-- Allow public read access
CREATE POLICY "Allow public read access on product-images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'product-images');

-- Allow authenticated users to upload
CREATE POLICY "Allow authenticated inserts on product-images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');

-- Allow authenticated users to update
CREATE POLICY "Allow authenticated updates on product-images"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete
CREATE POLICY "Allow authenticated deletes on product-images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');
