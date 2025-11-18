/*
  # [Operation Name]
  Alter Products Table Schema for Multiple Images

  ## Query Description: 
  This script modifies the `products` table to support multiple images per product. It drops the existing `image_url` column (which stored a single URL) and replaces it with an `image_urls` column of type `text[]` (an array of text). This change aligns the database schema with the application's frontend, which is designed to handle a gallery of images for each product.

  ## Metadata:
  - Schema-Category: "Structural"
  - Impact-Level: "Medium"
  - Requires-Backup: true
  - Reversible: true (by reverting to a single `image_url` column)
  
  ## Structure Details:
  - Table: `public.products`
  - Drops column: `image_url`
  - Adds column: `image_urls` (type: `text[]`)

  ## Security Implications:
  - RLS Status: No change. Existing RLS policies will apply to the new column.
  - Policy Changes: No.
  - Auth Requirements: No change.

  ## Performance Impact:
  - Indexes: None.
  - Triggers: None.
  - Estimated Impact: Low. This is a metadata change and will be fast on most tables. Data migration from the old column is not needed as it was not being used correctly due to the error.
*/

-- Drop the old single-image column if it exists
ALTER TABLE public.products
DROP COLUMN IF EXISTS image_url;

-- Add the new multi-image array column
ALTER TABLE public.products
ADD COLUMN image_urls text[] DEFAULT ARRAY[]::text[];
