import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "@phosphor-icons/react/dist/ssr";
import { Product } from "@/data/mock/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group flex flex-col border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 bg-white">
      <Link href={`/shop/${product.slug}`} className="relative aspect-square overflow-hidden bg-gray-50 block">
        <Image 
          src={product.thumbnail} 
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-2">{product.category}</div>
        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-1 hover:text-indigo-600 transition-colors">{product.name}</h3>
        </Link>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.short_description}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-extrabold text-gray-900">${product.price}</span>
          <button className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-900 hover:bg-indigo-600 hover:text-white transition-colors">
            <ShoppingCart size={20} weight="fill" />
          </button>
        </div>
      </div>
    </div>
  );
}

