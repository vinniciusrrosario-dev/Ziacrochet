import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Product } from '../types';
import ProductCard from './ProductCard';
import Spinner from './admin/Spinner';

const ProductShowcase = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error) {
        setProducts(data as Product[]);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <section id="produtos" className="py-16 md:py-24 bg-brand-light">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
          Nossos Produtos Artesanais
        </h2>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner />
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Nenhum produto cadastrado no momento.</p>
        )}
      </div>
    </section>
  );
};

export default ProductShowcase;
