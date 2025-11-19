import Header from '../components/Header';
import Hero from '../components/Hero';
import ProductShowcase from '../components/ProductShowcase';
import DeliveredWorksCarousel from '../components/DeliveredWorksCarousel';
import About from '../components/About';
import Footer from '../components/Footer';
// ❌ O import de useEffect foi removido

const HomePage = () => {
  // ❌ A lógica useEffect de scroll foi removida

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