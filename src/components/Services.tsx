import React from 'react';
import { Globe, Smartphone, ShoppingCart, Zap, Palette, Search } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Sites Institucionais',
    description: 'Websites profissionais que transmitem credibilidade e fortalecem sua marca no mercado.',
    color: 'bg-blue-500',
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce',
    description: 'Lojas virtuais completas e otimizadas para maximizar suas vendas online.',
    color: 'bg-purple-500',
  },
  {
    icon: Smartphone,
    title: 'Design Responsivo',
    description: 'Sites adaptáveis a todos os dispositivos: desktop, tablet e smartphone.',
    color: 'bg-pink-500',
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Websites rápidos e otimizados para melhor experiência do usuário.',
    color: 'bg-yellow-500',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Interfaces modernas e intuitivas focadas na experiência do usuário.',
    color: 'bg-green-500',
  },
  {
    icon: Search,
    title: 'SEO Otimizado',
    description: 'Sites preparados para ranquear bem nos mecanismos de busca.',
    color: 'bg-red-500',
  },
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Nossos Serviços
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Oferecemos soluções completas em desenvolvimento web para impulsionar seu negócio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className={`${service.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Precisa de uma solução personalizada?
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Entre em contato conosco e vamos criar a solução perfeita para seu negócio
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Falar com Especialista
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
