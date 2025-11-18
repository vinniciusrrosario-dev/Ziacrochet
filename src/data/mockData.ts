import { faker } from '@faker-js/faker/locale/pt_BR';
import type { Product, DeliveredWork } from '../types';

const generateProductImages = () => {
  return [
    faker.image.urlLoremFlickr({ category: 'crochet', width: 400, height: 400 }),
    faker.image.urlLoremFlickr({ category: 'yarn', width: 400, height: 400 }),
    faker.image.urlLoremFlickr({ category: 'handmade', width: 400, height: 400 }),
  ];
};

export const mockProducts: Product[] = Array.from({ length: 6 }, (_, i) => ({
  id: faker.string.uuid(),
  name: `Amigurumi de ${faker.animal.type()}`,
  description: 'Amigurumi fofo e macio, ideal para presentear e decorar. Feito com fio 100% algodão.',
  size: `Aprox. ${faker.number.int({ min: 15, max: 30 })}cm de altura`,
  priceRange: `A partir de R$${faker.commerce.price({ min: 50, max: 150, dec: 2 })}`,
  images: generateProductImages(),
}));

export const mockDeliveredWorks: DeliveredWork[] = Array.from({ length: 5 }, (_, i) => ({
  id: faker.string.uuid(),
  productName: `Cobertor de Bebê`,
  imageUrl: faker.image.urlLoremFlickr({ category: 'crochet', width: 500, height: 500 }),
  clientName: faker.person.firstName(),
}));
