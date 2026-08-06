import Link from "next/link";
import { StorefrontIcon } from "@phosphor-icons/react/dist/ssr";
import type { PublicProduct } from "@/services/productService";
import {
  formatMoney,
  getEffectivePrice,
  getDiscountPercentage,
  hasActiveSale,
} from "@/lib/productPricing";
import { AddToCartForm } from "./AddToCartForm";

interface ProductInfoProps {
  product: PublicProduct;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const categoryName = product.categories?.[0]?.name;
  const showSale = hasActiveSale(product);
  const discountPercentage = getDiscountPercentage(product);
  const tags = product.tags ?? [];

  return (
    <div className="flex flex-col">
      {categoryName && (
        <div className="mb-2 text-sm font-semibold uppercase tracking-wider text-indigo-600">
          {categoryName}
        </div>
      )}

      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
        {product.name}
      </h1>

      <div className="mb-6 flex items-baseline gap-3">
        <span className="text-3xl font-bold text-gray-900">
          {formatMoney(getEffectivePrice(product))}
        </span>
        {showSale && (
          <>
            <span className="text-lg font-medium text-gray-400 line-through">
              {formatMoney(product.regular_price)}
            </span>
            <span className="rounded-full bg-red-50 px-2.5 py-1 text-sm font-bold text-red-600">
              -{discountPercentage}%
            </span>
          </>
        )}
      </div>

      <p className="mb-6 leading-relaxed text-gray-600">
        {product.short_description}
      </p>

      {product.in_stock ? (
        <span className="inline-block w-max rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-600">
          In Stock
        </span>
      ) : (
        <span className="inline-block w-max rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-600">
          Out of Stock
        </span>
      )}

      {product.vendor && (
        <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
          <StorefrontIcon size={18} />
          Sold by
          <Link
            href={`/vendors/${product.vendor.slug}`}
            className="cursor-pointer font-semibold text-indigo-600 transition-colors hover:text-indigo-700 hover:underline"
          >
            {product.vendor.shop_name}
          </Link>
        </div>
      )}

      {tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag.id}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}

      <AddToCartForm product={product} />
    </div>
  );
}
