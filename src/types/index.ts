// Matches the 'products' table in Supabase
export interface Product {
  id: number;
  name: string;
  description: string;
  size: string;
  price_range: string;
  image_urls: string[];
  created_at: string;
}

// Matches the 'delivered_works' table in Supabase
export interface DeliveredWork {
  id: number;
  product_name: string;
  image_url: string;
  client_name?: string;
  created_at: string;
}
