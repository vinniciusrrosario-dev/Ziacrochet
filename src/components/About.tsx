const About = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-light">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <img 
            src="https://images.pexels.com/photos/7134471/pexels-photo-7134471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Artesã trabalhando em uma peça de crochê"
            className="rounded-lg shadow-xl w-full"
          />
        </div>
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Sobre Nós</h2>
          <p className="text-lg text-gray-700 mb-4">
            Na Zia Crochet, cada peça é uma história de dedicação. Nascemos da paixão pelo artesanal e do desejo de levar aconchego e beleza para o seu lar.
          </p>
          <p className="text-lg text-gray-700">
            Utilizamos apenas materiais de alta qualidade e colocamos nosso coração em cada ponto, garantindo produtos únicos e cheios de carinho.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
