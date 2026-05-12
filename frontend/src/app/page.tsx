import { getFeaturedProducts } from "@/services/productService";
import { ShoppingCart } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const products = await getFeaturedProducts();

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="bg-blue-50 py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
            Discover Premium Products
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Shop directly from verified vendors worldwide. The best quality, straight to your door.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/shop" className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
              Start Shopping
            </Link>
            <Link href="/vendors/register" className="bg-white text-blue-600 border border-blue-200 px-8 py-3 rounded-full font-medium hover:bg-blue-50 transition-colors shadow-sm hover:shadow">
              Become a Vendor
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Featured Products</h2>
          <Link href="/shop" className="text-blue-600 font-medium hover:underline">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group flex flex-col border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 bg-white">
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                <Image 
                  src={product.thumbnail} 
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">{product.category}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.short_description}</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xl font-extrabold text-gray-900">${product.price}</span>
                  <button className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-900 hover:bg-blue-600 hover:text-white transition-colors">
                    <ShoppingCart size={20} weight="fill" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
