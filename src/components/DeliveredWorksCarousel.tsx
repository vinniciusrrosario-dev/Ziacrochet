import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { supabase } from '../lib/supabase';
import type { DeliveredWork } from '../types';
import Spinner from './admin/Spinner';

const DeliveredWorksCarousel = () => {
  const [works, setWorks] = useState<DeliveredWork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorks = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('delivered_works')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error) {
        setWorks(data as DeliveredWork[]);
      }
      setLoading(false);
    };

    fetchWorks();
  }, []);

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 flex justify-center items-center h-80">
          <Spinner />
        </div>
      </section>
    );
  }

  if (works.length === 0) {
    return null; // Don't render the section if there are no works
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
          Clientes Felizes e Nossos Trabalhos
        </h2>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {works.map((work: DeliveredWork) => (
            <SwiperSlide key={work.id}>
              <div className="flex flex-col items-center text-center">
                <img src={work.image_url} alt={work.product_name} className="w-full h-80 object-cover rounded-lg shadow-lg mb-4" />
                <h3 className="font-bold text-lg">{work.product_name}</h3>
                {work.client_name && <p className="text-gray-500">Feito com carinho para {work.client_name}</p>}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default DeliveredWorksCarousel;
