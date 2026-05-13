import { Product } from "@/data/mock/products";
import { AddToCartForm } from "./AddToCartForm";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="flex flex-col">
      <div className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2">
        {product.category}
      </div>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
        {product.name}
      </h1>
      <div className="text-2xl font-bold text-gray-900 mb-6">
        ${product.price}
      </div>
      <p className="text-gray-600 leading-relaxed mb-6">
        {product.short_description}
      </p>
      
      {product.in_stock ? (
        <span className="text-green-600 font-medium bg-green-50 inline-block px-3 py-1 rounded-full text-sm w-max">
          In Stock
        </span>
      ) : (
        <span className="text-red-600 font-medium bg-red-50 inline-block px-3 py-1 rounded-full text-sm w-max">
          Out of Stock
        </span>
      )}

      <AddToCartForm product={product} />
    </div>
  );
}
