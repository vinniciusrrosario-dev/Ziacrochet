import Header from '../components/Header';
import Hero from '../components/Hero';
import ProductShowcase from '../components/ProductShowcase';
import DeliveredWorksCarousel from '../components/DeliveredWorksCarousel';
import About from '../components/About';
import Footer from '../components/Footer';
import { useEffect } from 'react'; // ⭐️ NOVO IMPORT

const HomePage = () => {
  // ⭐️ NOVO: Lógica para forçar a rolagem correta com links âncora (#)
  useEffect(() => {
    // Pega o hash da URL (ex: #produtos)
    const hash = window.location.hash;
    
    if (hash) {
      // O timeout 0 permite que o navegador termine de processar o restante da interface
      // antes de forçar a rolagem, prevenindo o crash do render.
      setTimeout(() => {
        // Remove o '#' para obter o ID do elemento
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0); 
    }
  }, []); // Executa apenas no carregamento inicial da página

  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProductShowcase />
        <DeliveredWorksCarousel />
        <About />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;