/*
# [Fix and Recreate Initial Schema]
This script safely drops any existing objects from the previous migration attempt and recreates the entire initial schema for the Zia Crochet store. It ensures a clean and correct database structure.

## Query Description:
This is a safe, idempotent script. It uses `DROP ... IF EXISTS` to avoid errors if the objects don't exist. It will remove any data in the `products` and `delivered_works` tables if they exist. Since this is the initial setup, no production data will be lost.

## Metadata:
- Schema-Category: ["Structural"]
- Impact-Level: ["Medium"]
- Requires-Backup: false
- Reversible: false

## Structure Details:
- Drops and recreates table `products`.
- Drops and recreates table `delivered_works`.
- Drops and recreates storage bucket `product-images`.
- Drops and recreates all RLS policies for tables and storage.

## Security Implications:
- RLS Status: Re-enables RLS on all tables.
- Policy Changes: Yes, recreates all policies.
- Auth Requirements: `authenticated` role required for insert/update/delete.

## Performance Impact:
- Indexes: Creates primary key indexes.
- Triggers: None.
- Estimated Impact: Low.
*/

-- ========= CLEANUP PHASE =========
-- Drop existing policies and tables to ensure a clean slate.

-- Drop policies on delivered_works
DROP POLICY IF EXISTS "Enable read access for all users" ON "public"."delivered_works";
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON "public"."delivered_works";
DROP POLICY IF EXISTS "Enable update for authenticated users" ON "public"."delivered_works";
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON "public"."delivered_works";

-- Drop policies on products
DROP POLICY IF EXISTS "Enable read access for all users" ON "public"."products";
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON "public"."products";
DROP POLICY IF EXISTS "Enable update for authenticated users" ON "public"."products";
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON "public"."products";

-- Drop tables
DROP TABLE IF EXISTS "public"."delivered_works";
DROP TABLE IF EXISTS "public"."products";

-- ========= RECREATION PHASE =========

-- Create the "products" table
CREATE TABLE "public"."products" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "created_at" timestamp with time zone NOT NULL DEFAULT now(),
    "name" text NOT NULL,
    "description" text,
    "size" character varying,
    "price_range" character varying,
    "images" text[]
);
ALTER TABLE "public"."products" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."products" ADD CONSTRAINT "products_pkey" PRIMARY KEY USING INDEX "products_pkey";
CREATE UNIQUE INDEX products_pkey ON public.products USING btree (id);
COMMENT ON TABLE "public"."products" IS 'Stores all available crochet products for sale.';

-- Create the "delivered_works" table
CREATE TABLE "public"."delivered_works" (
    "id" uuid NOT NULL DEFAULT gen_random_uuid(),
    "created_at" timestamp with time zone NOT NULL DEFAULT now(),
    "product_name" text NOT NULL,
    "image_url" text,
    "client_name" text
);
ALTER TABLE "public"."delivered_works" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."delivered_works" ADD CONSTRAINT "delivered_works_pkey" PRIMARY KEY USING INDEX "delivered_works_pkey";
CREATE UNIQUE INDEX delivered_works_pkey ON public.delivered_works USING btree (id);
COMMENT ON TABLE "public"."delivered_works" IS 'Showcases completed and delivered works for social proof.';

-- Create Storage Bucket for images
-- Note: This uses an INSERT statement which is the correct way to create a bucket via SQL.
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;
COMMENT ON BUCKET "product-images" IS 'Stores all images for products and delivered works.';

-- ========= SECURITY POLICIES (RLS) =========

-- Policies for "products" table
CREATE POLICY "Enable read access for all users" ON "public"."products" FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users" ON "public"."products" FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users" ON "public"."products" FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Enable delete for authenticated users" ON "public"."products" FOR DELETE TO authenticated USING (true);

-- Policies for "delivered_works" table
CREATE POLICY "Enable read access for all users" ON "public"."delivered_works" FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users" ON "public"."delivered_works" FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users" ON "public"."delivered_works" FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Enable delete for authenticated users" ON "public"."delivered_works" FOR DELETE TO authenticated USING (true);

-- Policies for "product-images" storage bucket
CREATE POLICY "Allow public read access" ON storage.objects FOR SELECT USING ( bucket_id = 'product-images' );
CREATE POLICY "Allow authenticated insert" ON storage.objects FOR INSERT TO authenticated WITH CHECK ( bucket_id = 'product-images' );
CREATE POLICY "Allow authenticated update" ON storage.objects FOR UPDATE TO authenticated USING ( bucket_id = 'product-images' );
CREATE POLICY "Allow authenticated delete" ON storage.objects FOR DELETE TO authenticated USING ( bucket_id = 'product-images' );
