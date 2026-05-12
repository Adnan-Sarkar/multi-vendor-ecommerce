import { mockProducts, Product } from '@/data/mock/products';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getFeaturedProducts(): Promise<Product[]> {
  await delay(1000);
  return mockProducts.slice(0, 4);
}

export async function getAllProducts(): Promise<Product[]> {
  await delay(1000);
  return mockProducts;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  await delay(1000);
  return mockProducts.find(p => p.slug === slug) || null;
}
