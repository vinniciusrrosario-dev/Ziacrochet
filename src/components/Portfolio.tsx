import React from 'react';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'E-commerce de Moda',
    category: 'Loja Virtual',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
    description: 'Loja virtual completa com integração de pagamento e gestão de estoque',
  },
  {
    title: 'Site Corporativo',
    category: 'Institucional',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    description: 'Website institucional moderno para empresa de tecnologia',
  },
  {
    title: 'Aplicativo Web SaaS',
    category: 'Aplicação Web',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    description: 'Plataforma de gestão com dashboard interativo',
  },
  {
    title: 'Landing Page',
    category: 'Marketing',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
    description: 'Landing page de alta conversão para campanha digital',
  },
  {
    title: 'Portal de Notícias',
    category: 'Portal',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800',
    description: 'Portal de notícias com CMS personalizado',
  },
  {
    title: 'App de Reservas',
    category: 'Aplicação',
    image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800',
    description: 'Sistema de reservas online para restaurantes',
  },
];

const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Portfólio de Projetos
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Confira alguns dos projetos que desenvolvemos para nossos clientes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="aspect-w-16 aspect-h-12 relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block bg-blue-600 px-3 py-1 rounded-full text-xs font-semibold mb-2">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-sm text-gray-200 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {project.description}
                </p>
                <button className="flex items-center space-x-2 text-white hover:text-blue-300 transition-colors opacity-0 group-hover:opacity-100 delay-150">
                  <span className="text-sm font-semibold">Ver Projeto</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
