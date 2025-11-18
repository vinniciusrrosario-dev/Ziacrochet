const Hero = () => {
  return (
    <section className="relative h-[60vh] md:h-[80vh] bg-cover bg-center text-white" style={{ backgroundImage: "url('https://images.pexels.com/photos/8346133/pexels-photo-8346133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-4 animate-fade-in-down">
          Arte em Cada Ponto
        </h1>
        <p className="text-lg md:text-2xl max-w-2xl mb-8 animate-fade-in-up">
          Descubra a beleza e o carinho em nossos produtos artesanais
        </p>
        <a 
          href="#produtos"
          className="bg-brand-green text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300"
        >
          Ver Produtos
        </a>
      </div>
    </section>
  );
};

export default Hero;
