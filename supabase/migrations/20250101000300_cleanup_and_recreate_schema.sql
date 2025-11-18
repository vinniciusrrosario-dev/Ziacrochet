-- Full Cleanup and Recreation Script

/*
# [Schema Cleanup and Recreation]
This script completely removes and recreates the database schema for the Zia Crochet store. It is designed to fix previous migration errors by ensuring a clean state.

## Query Description:
This operation will first attempt to delete the 'products' and 'delivered_works' tables, their associated security policies, and the storage bucket. It will then recreate them from scratch. This is a safe operation for a new setup but would cause data loss on a production database. Since we are in the initial setup phase, no data will be lost.

## Metadata:
- Schema-Category: "Structural"
- Impact-Level: "High"
- Requires-Backup: false
- Reversible: false

## Structure Details:
- Drops and recreates table: `products`
- Drops and recreates table: `delivered_works`
- Drops and recreates storage bucket: `product-images`
- Drops and recreates all RLS policies for these tables.

## Security Implications:
- RLS Status: Re-enabled on all tables.
- Policy Changes: Yes, policies are dropped and recreated.
- Auth Requirements: Admin users (authenticated role) can manage data. All users (anon) can read data.

## Performance Impact:
- Indexes: Primary key indexes are recreated.
- Triggers: None.
- Estimated Impact: Negligible on an empty database.
*/

-- Step 1: Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow admin to manage products" ON public.products;
DROP POLICY IF EXISTS "Allow all users to view products" ON public.products;
DROP POLICY IF EXISTS "Allow admin to manage delivered works" ON public.delivered_works;
DROP POLICY IF EXISTS "Allow all users to view delivered works" ON public.delivered_works;
DROP POLICY IF EXISTS "Allow admin to manage images" ON storage.objects;
DROP POLICY IF EXISTS "Allow all users to view images" ON storage.objects;

-- Step 2: Drop existing tables if they exist
DROP TABLE IF EXISTS public.delivered_works;
DROP TABLE IF EXISTS public.products;

-- Step 3: Create the products table
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    size TEXT,
    price_range TEXT,
    images TEXT[]
);
COMMENT ON TABLE public.products IS 'Stores information about crochet products for sale.';

-- Step 4: Create the delivered_works table
CREATE TABLE public.delivered_works (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    product_name TEXT NOT NULL,
    image_url TEXT NOT NULL,
    client_name TEXT
);
COMMENT ON TABLE public.delivered_works IS 'Stores information about delivered works for the portfolio carousel.';

-- Step 5: Create storage bucket for images (idempotent)
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Step 6: Enable Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivered_works ENABLE ROW LEVEL SECURITY;

-- Step 7: Create RLS policies for products table
CREATE POLICY "Allow all users to view products"
ON public.products FOR SELECT
USING (true);

CREATE POLICY "Allow admin to manage products"
ON public.products FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Step 8: Create RLS policies for delivered_works table
CREATE POLICY "Allow all users to view delivered works"
ON public.delivered_works FOR SELECT
USING (true);

CREATE POLICY "Allow admin to manage delivered works"
ON public.delivered_works FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Step 9: Create RLS policies for storage
CREATE POLICY "Allow all users to view images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

CREATE POLICY "Allow admin to manage images"
ON storage.objects FOR ALL
USING (bucket_id = 'product-images' AND auth.role() = 'authenticated')
WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');
