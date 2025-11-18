import Header from '../components/Header';
import Hero from '../components/Hero';
import ProductShowcase from '../components/ProductShowcase';
import DeliveredWorksCarousel from '../components/DeliveredWorksCarousel';
import About from '../components/About';
import Footer from '../components/Footer';

const HomePage = () => {
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
