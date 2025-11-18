import { Instagram, Facebook, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contato" className="bg-brand-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">Zia Crochet</h3>
            <p className="text-gray-400">Arte em cada ponto, feita com amor.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Navegação</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">Página Inicial</Link></li>
              <li><a href="#produtos" className="text-gray-400 hover:text-white">Produtos</a></li>
              <li><a href="#contato" className="text-gray-400 hover:text-white">Contato</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Contato & Redes Sociais</h4>
            <div className="flex justify-center md:justify-start items-center gap-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-white"><Instagram size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Facebook size={24} /></a>
            </div>
            <a href="mailto:contato@ziacrochet.com" className="flex justify-center md:justify-start items-center gap-2 text-gray-400 hover:text-white">
              <Mail size={20} />
              <span>contato@ziacrochet.com</span>
            </a>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} Zia Crochet. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
