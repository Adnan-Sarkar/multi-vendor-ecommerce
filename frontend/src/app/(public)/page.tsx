import { getFeaturedProducts } from "@/services/productService";
import { ProductCard } from "@/components/shared/ProductCard";
import Link from "next/link";

export default async function Home() {
  const products = await getFeaturedProducts();

  return (
    <div className="flex flex-col gap-16 pb-16">
      <section className="bg-indigo-50 py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
            Discover Premium Products
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Shop directly from verified vendors worldwide. The best quality, straight to your door.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/shop" className="bg-indigo-600 text-white px-8 py-3 rounded-full font-medium hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl">
              Start Shopping
            </Link>
            <Link href="/vendors/register" className="bg-white text-indigo-600 border border-indigo-200 px-8 py-3 rounded-full font-medium hover:bg-indigo-50 transition-colors shadow-sm hover:shadow">
              Become a Vendor
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Featured Products</h2>
          <Link href="/shop" className="text-indigo-600 font-medium hover:underline">
            View All
          </Link>
        </div>
        
        {products.length === 0 ? (
          <p className="text-gray-500">No featured products available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

