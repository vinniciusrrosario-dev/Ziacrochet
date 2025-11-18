import { Link } from 'react-router-dom';
import { MessageCircle, ShoppingBag } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl md:text-3xl font-serif font-bold text-brand-dark">
          Zia Crochet
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-lg">
          <Link to="/" className="hover:text-brand-green transition-colors">Página Inicial</Link>
          <a href="#produtos" className="hover:text-brand-green transition-colors">Produtos</a>
          <a href="#contato" className="hover:text-brand-green transition-colors">Contato</a>
        </nav>
        <div className="flex items-center gap-4">
          <a 
            href="https://wa.me/5511999999999?text=Ol%C3%A1%21+Gostaria+de+fazer+uma+consulta." 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors"
          >
            <MessageCircle size={20} />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
          <Link to="/admin" className="text-sm text-gray-500 hover:text-brand-dark transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
