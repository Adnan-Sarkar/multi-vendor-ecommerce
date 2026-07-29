import Image from "next/image";
import Link from "next/link";
import { PackageIcon, StarIcon } from "@phosphor-icons/react/dist/ssr";
import type { PublicProduct } from "@/services/productService";
import {
  formatMoney,
  getEffectivePrice,
  getDiscountPercentage,
  getStockInfo,
  hasActiveSale,
} from "@/lib/productPricing";
import { AddToCartButton } from "./AddToCartButton";
import { WishlistButton } from "./WishlistButton";

interface ProductCardProps {
  product: PublicProduct;
  isWishlisted?: boolean;
  onWishlistChange?: (active: boolean) => void;
}

const STOCK_DOT_COLORS: Record<string, string> = {
  in: "bg-green-500",
  low: "bg-amber-500",
  out: "bg-red-400",
};

const STOCK_TEXT_COLORS: Record<string, string> = {
  in: "text-gray-500",
  low: "text-amber-600",
  out: "text-red-500",
};

export function ProductCard({
  product,
  isWishlisted,
  onWishlistChange,
}: ProductCardProps) {
  const categoryName = product.categories?.[0]?.name;
  const showSale = hasActiveSale(product);
  const discountPercentage = getDiscountPercentage(product);
  const stock = getStockInfo(product);
  const reviewsCount = product.reviews_count;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:border-indigo-100 hover:shadow-xl">
      <div className="relative aspect-square bg-gray-50">
        <Link
          href={`/shop/${product.slug}`}
          className="block h-full w-full cursor-pointer overflow-hidden"
        >
          {product.thumbnail ? (
            <Image
              src={product.thumbnail}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-300">
              <PackageIcon size={52} />
            </div>
          )}

          {!product.in_stock && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/60">
              <span className="rounded-full bg-gray-900 px-4 py-1.5 text-xs font-semibold text-white">
                Out of Stock
              </span>
            </div>
          )}
        </Link>

        {showSale && (
          <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-red-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
            -{discountPercentage}%
          </span>
        )}

        <div className="absolute right-3 top-3">
          <WishlistButton
            productId={product.id}
            initialActive={isWishlisted}
            onChange={onWishlistChange}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-1.5 flex items-center justify-between gap-2">
          {categoryName ? (
            <span className="truncate text-[11px] font-medium uppercase tracking-wide text-indigo-500">
              {categoryName}
            </span>
          ) : (
            <span />
          )}

          {reviewsCount !== undefined &&
            (reviewsCount > 0 ? (
              <span className="flex shrink-0 items-center gap-1 text-xs text-gray-500">
                <StarIcon size={12} weight="fill" className="text-amber-400" />
                {reviewsCount}
              </span>
            ) : (
              <span className="shrink-0 text-xs text-gray-400">No reviews</span>
            ))}
        </div>

        <Link href={`/shop/${product.slug}`} className="cursor-pointer">
          <h3 className="line-clamp-1 text-[15px] font-semibold text-gray-900 transition-colors hover:text-indigo-600">
            {product.name}
          </h3>
        </Link>

        <span
          className={`mt-1.5 flex items-center gap-1.5 text-xs ${STOCK_TEXT_COLORS[stock.status]}`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${STOCK_DOT_COLORS[stock.status]}`}
          />
          {stock.label}
        </span>

        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <div className="flex min-w-0 items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">
              {formatMoney(getEffectivePrice(product))}
            </span>
            {showSale && (
              <span className="truncate text-xs font-medium text-gray-400 line-through">
                {formatMoney(product.regular_price)}
              </span>
            )}
          </div>

          <div className="shrink-0">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
