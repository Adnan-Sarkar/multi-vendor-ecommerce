import { Product } from "@/data/mock/products";
import { ProductCard } from "@/components/shared/ProductCard";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="flex-1">
      <div className="mb-6 flex items-center justify-between">
        <span className="text-sm text-gray-500">Showing {products.length} products</span>
        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option>Most Popular</option>
          <option>Newest Arrivals</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

