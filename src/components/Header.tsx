import React, { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Code2 className={`w-8 h-8 ${isScrolled ? 'text-blue-600' : 'text-white'}`} />
            <span className={`text-xl font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              WebDev Pro
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className={`hover:text-blue-600 transition-colors ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className={`hover:text-blue-600 transition-colors ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Serviços
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              className={`hover:text-blue-600 transition-colors ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Portfólio
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className={`hover:text-blue-600 transition-colors ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Depoimentos
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              Contato
            </button>
          </div>

          <button
            className={`md:hidden ${isScrolled ? 'text-gray-900' : 'text-white'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('home')}
                className="text-gray-700 hover:text-blue-600 transition-colors text-left"
              >
                Início
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-gray-700 hover:text-blue-600 transition-colors text-left"
              >
                Serviços
              </button>
              <button
                onClick={() => scrollToSection('portfolio')}
                className="text-gray-700 hover:text-blue-600 transition-colors text-left"
              >
                Portfólio
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="text-gray-700 hover:text-blue-600 transition-colors text-left"
              >
                Depoimentos
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                Contato
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
