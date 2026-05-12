export interface Product {
  id: number;
  slug: string;
  name: string;
  short_description: string;
  price: number;
  thumbnail: string;
  category: string;
  in_stock: boolean;
  rating: number;
}

export const mockProducts: Product[] = [
  {
    id: 1,
    slug: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    short_description: 'Titanium design. A17 Pro chip. 48MP Main camera.',
    price: 999,
    thumbnail: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=600&auto=format&fit=crop',
    category: 'Electronics',
    in_stock: true,
    rating: 4.8,
  },
  {
    id: 2,
    slug: 'sony-wh-1000xm5',
    name: 'Sony WH-1000XM5',
    short_description: 'Industry leading noise canceling headphones.',
    price: 348,
    thumbnail: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop',
    category: 'Audio',
    in_stock: true,
    rating: 4.7,
  },
  {
    id: 3,
    slug: 'macbook-air-m3',
    name: 'MacBook Air M3',
    short_description: 'Supercharged by M3. 13.6-inch Liquid Retina display.',
    price: 1099,
    thumbnail: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop',
    category: 'Computers',
    in_stock: true,
    rating: 4.9,
  },
  {
    id: 4,
    slug: 'samsung-galaxy-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra',
    short_description: 'Galaxy AI is here. Welcome to the era of mobile AI.',
    price: 1299,
    thumbnail: 'https://images.unsplash.com/photo-1707153723381-807971b3e157?q=80&w=600&auto=format&fit=crop',
    category: 'Electronics',
    in_stock: true,
    rating: 4.8,
  }
];
