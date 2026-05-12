import { getAllProducts } from "@/services/productService";
import { ShopFilters } from "./components/ShopFilters";
import { ProductGrid } from "./components/ProductGrid";

export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">All Products</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <ShopFilters />
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
