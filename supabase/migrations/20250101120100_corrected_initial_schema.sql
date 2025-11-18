/*
          # [Initial Schema Setup - Corrected]
          This script sets up the initial database schema for the Zia Crochet store. It was corrected to remove an invalid SQL command.

          ## Query Description:
          This operation is structural and foundational for the application. It creates two new tables (`products`, `delivered_works`), a storage bucket for images, and sets up Row Level Security (RLS) policies. These policies ensure that data can only be modified by authenticated administrators, while public visitors have read-only access. There is no existing data, so no data will be lost.

          ## Metadata:
          - Schema-Category: "Structural"
          - Impact-Level: "Low"
          - Requires-Backup: false
          - Reversible: true

          ## Structure Details:
          - Tables Created: `public.products`, `public.delivered_works`
          - Storage Bucket Created: `product-images`
          - RLS Policies: Enabled for both tables, with policies for public read access and admin full access. Policies for storage access are also included.

          ## Security Implications:
          - RLS Status: Enabled on `products` and `delivered_works`.
          - Policy Changes: Yes, new policies are created to secure the tables and storage.
          - Auth Requirements: `authenticated` role is required for any write operations (INSERT, UPDATE, DELETE).

          ## Performance Impact:
          - Indexes: Primary keys are automatically indexed. No other indexes added at this time.
          - Triggers: None.
          - Estimated Impact: Negligible on a new database.
          */

-- 1. Create Products Table
CREATE TABLE public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    size TEXT,
    price_range TEXT,
    images TEXT[]
);
COMMENT ON TABLE public.products IS 'Stores information about crochet products available for sale.';

-- 2. Create Delivered Works Table
CREATE TABLE public.delivered_works (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    product_name TEXT NOT NULL,
    image_url TEXT,
    client_name TEXT
);
COMMENT ON TABLE public.delivered_works IS 'Stores information about delivered works for the portfolio carousel.';

-- 3. Create Storage Bucket for Images
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', TRUE)
ON CONFLICT (id) DO NOTHING;

-- 4. Enable Row Level Security (RLS) for products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS policies for products
CREATE POLICY "Public can read products"
ON public.products FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admins can manage products"
ON public.products FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 6. Enable RLS for delivered_works
ALTER TABLE public.delivered_works ENABLE ROW LEVEL SECURITY;

-- 7. Create RLS policies for delivered_works
CREATE POLICY "Public can read delivered works"
ON public.delivered_works FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admins can manage delivered works"
ON public.delivered_works FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 8. Create RLS policies for storage
CREATE POLICY "Admins can manage product images"
ON storage.objects FOR ALL
TO authenticated
USING (bucket_id = 'product-images');

CREATE POLICY "Public can view product images"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'product-images');
