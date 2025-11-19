import { Link } from 'react-router-dom';
// ⭐️ CORREÇÃO DE IMPORTS: HashLink e Hooks do React
import { HashLink } from 'react-router-hash-link';
import { MessageCircle, Menu, X } from 'lucide-react'; 
import { useState, useCallback } from 'react'; // ⭐️ Importações corretas do 'react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Usando useCallback para garantir que a função de fechar menu seja estável
  const handleLinkClick = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Usando useCallback e definindo a função de rolagem
  const scrollWithOffset = useCallback((el: HTMLElement) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -60; // Ajusta para a altura do cabeçalho fixo
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
  }, []);


  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* LOGO */}
        <Link to="/" className="text-2xl md:text-3xl font-serif font-bold text-brand-dark">
          Zia Crochet
        </Link>
        
        {/* NAVEGAÇÃO DESKTOP */}
        <nav className="hidden md:flex items-center gap-6 text-lg">
          <Link to="/" className="hover:text-brand-green transition-colors">Página Inicial</Link>
          <HashLink to="/#produtos" className="hover:text-brand-green transition-colors" scroll={scrollWithOffset}>Produtos</HashLink>
          <HashLink to="/#contato" className="hover:text-brand-green transition-colors" scroll={scrollWithOffset}>Contato</HashLink>
        </nav>
        
        <div className="flex items-center gap-4">
          
          <a 
            href="https://wa.me/5511999999999?text=Ol%C3%A1%21+Gostaria+de+fazer+uma+consulta." 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors"
          >
            <MessageCircle size={20} />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
          <Link to="/admin" className="hidden md:block text-sm text-gray-500 hover:text-brand-dark transition-colors">
            Admin
          </Link>
          
          {/* BOTÃO DE HAMBÚRGUER (SÓ MOBILE) */}
          <button 
            className="md:hidden p-2" 
            onClick={() => setIsMenuOpen(true)}
            aria-label="Abrir menu principal"
          >
            <Menu size={28} />
          </button>
        </div>
      </div>
      
      {/* Overlay de fundo */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden" 
          onClick={() => setIsMenuOpen(false)} 
        />
      )}

      {/* Menu Mobile */}
      <div 
        className={`
          fixed top-0 right-0 h-screen w-full sm:w-80 bg-white shadow-xl z-50 p-6 flex flex-col transition-transform duration-300 ease-in-out
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Cabeçalho do Menu Mobile e Botão Fechar */}
        <div className="flex justify-end mb-8">
           <button onClick={() => setIsMenuOpen(false)} className="p-2" aria-label="Fechar menu">
              <X size={24} />
           </button>
        </div>
        
        {/* Links do Menu Mobile */}
        <nav className="flex flex-col gap-6 text-xl font-medium">
          <Link to="/" className="hover:text-brand-green transition-colors" onClick={handleLinkClick}>Página Inicial</Link>
          <HashLink to="/#produtos" className="hover:text-brand-green transition-colors" scroll={scrollWithOffset} onClick={handleLinkClick}>Produtos</HashLink>
          <HashLink to="/#contato" className="hover:text-brand-green transition-colors" scroll={scrollWithOffset} onClick={handleLinkClick}>Contato</HashLink>
        </nav>
        
        {/* Botões Adicionais (WhatsApp e Admin) */}
        <div className="mt-auto pt-6 border-t border-gray-200 flex flex-col gap-4">
          <a 
            href="https://wa.me/5511999999999?text=Ol%C3%A1%21+Gostaria+de+fazer+uma+consulta." 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-green-500 text-white font-bold py-2 px-4 rounded-full hover:bg-green-600 transition-colors"
            onClick={handleLinkClick}
          >
            <MessageCircle size={20} />
            Fale no WhatsApp
          </a>
          <Link 
            to="/admin" 
            className="text-center text-sm text-gray-500 hover:text-brand-dark transition-colors" 
            onClick={handleLinkClick}
          >
            Painel Admin
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Header;