import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Maria Silva',
    role: 'CEO, Fashion Store',
    image: 'https://i.pravatar.cc/150?img=1',
    content: 'A equipe desenvolveu um e-commerce excepcional que aumentou nossas vendas online em 300%. Profissionalismo e qualidade garantidos!',
    rating: 5,
  },
  {
    name: 'João Santos',
    role: 'Diretor, Tech Solutions',
    image: 'https://i.pravatar.cc/150?img=2',
    content: 'Superaram todas as expectativas! O site ficou moderno, rápido e exatamente como imaginávamos. Recomendo muito!',
    rating: 5,
  },
  {
    name: 'Ana Costa',
    role: 'Gerente, Restaurante Gourmet',
    image: 'https://i.pravatar.cc/150?img=3',
    content: 'O sistema de reservas online transformou nosso negócio. Interface intuitiva e suporte impecável. Estamos muito satisfeitos!',
    rating: 5,
  },
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Depoimentos reais de clientes satisfeitos com nossos serviços
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-blue-100" />
              
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-blue-100"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed italic">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 bg-white rounded-full px-8 py-4 shadow-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">4.9</div>
              <div className="text-sm text-gray-600">Avaliação Média</div>
            </div>
            <div className="h-12 w-px bg-gray-300"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">150+</div>
              <div className="text-sm text-gray-600">Avaliações</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
