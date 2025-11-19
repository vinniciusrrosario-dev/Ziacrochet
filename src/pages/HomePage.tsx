import Header from '../components/Header';
import Hero from '../components/Hero';
import ProductShowcase from '../components/ProductShowcase';
import DeliveredWorksCarousel from '../components/DeliveredWorksCarousel';
import About from '../components/About';
import Footer from '../components/Footer';
// Nenhuma importação de useEffect

const HomePage = () => {
  // Nenhuma lógica useEffect ou código de scroll aqui

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