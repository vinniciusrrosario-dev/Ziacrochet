import { Link } from 'react-router-dom';
import { MessageCircle, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  // Estado para controlar a visibilidade do menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Função para fechar o menu ao clicar em um link
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* LOGO */}
        <Link to="/" className="text-2xl md:text-3xl font-serif font-bold text-brand-dark">
          Zia Crochet
        </Link>
        
        {/* NAVEGAÇÃO DESKTOP (Visível a partir de md) */}
        <nav className="hidden md:flex items-center gap-6 text-lg">
          <Link to="/" className="hover:text-brand-green transition-colors">Página Inicial</Link>
          <a href="#produtos" className="hover:text-brand-green transition-colors">Produtos</a>
          <a href="#contato" className="hover:text-brand-green transition-colors">Contato</a>
        </nav>
        
        {/* BOTÕES À DIREITA */}
        <div className="flex items-center gap-4">
          
          {/* Botão WhatsApp e Admin (visível no desktop) */}
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
      
      {/* ⭐️ MENU MOBILE (Fixed Sidebar - CORRIGIDO) */}
      {/* Overlay de fundo (z-40) que cobre a tela inteira */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden" 
          onClick={() => setIsMenuOpen(false)} 
        />
      )}

      {/* ⭐️ Barra Lateral (z-50) */}
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
          <a href="#produtos" className="hover:text-brand-green transition-colors" onClick={handleLinkClick}>Produtos</a>
          <a href="#contato" className="hover