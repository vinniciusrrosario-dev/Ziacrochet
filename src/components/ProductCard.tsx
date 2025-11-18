import React, { useState } from 'react';
import type { Product } from '../types';
import { MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = product.image_urls || [];

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  
  const whatsappMessage = encodeURIComponent(`Olá, gostaria de saber mais sobre o produto: ${product.name}.`);
  const whatsappLink = `https://wa.me/5511999999999?text=${whatsappMessage}`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
      <div className="relative">
        <img 
          src={images[currentImageIndex] || 'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x400/90A423/FFFFFF?text=Imagem...'} 
          alt={product.name} 
          className="w-full h-64 object-cover" 
        />
        {images.length > 1 && (
          <>
            <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronLeft size={20} />
            </button>
            <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-serif font-bold text-brand-dark mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2 flex-grow">{product.description}</p>
        <p className="text-gray-500 text-xs mb-3">{product.size}</p>
        <p className="font-bold text-brand-green text-lg mb-4">{product.price_range}</p>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full mt-auto flex items-center justify-center gap-2 bg-brand-green text-white font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors"
        >
          <MessageCircle size={18} />
          Consultar via WhatsApp
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
