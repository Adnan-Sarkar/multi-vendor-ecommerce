import { PackageIcon } from "@phosphor-icons/react/dist/ssr";
import { ProductCard } from "@/components/shared/ProductCard";
import type { PublicProduct } from "@/services/productService";
import type { PaginationMeta } from "@/services/vendorProductService";
import { ProductsSortSelect } from "./ProductsSortSelect";
import { ShopPagination } from "./ShopPagination";

interface ProductGridProps {
  products: PublicProduct[];
  meta: PaginationMeta;
  wishlistedProductIds?: number[];
}

export function ProductGrid({
  products,
  meta,
  wishlistedProductIds = [],
}: ProductGridProps) {
  const wishlistedSet = new Set(wishlistedProductIds);

  return (
    <div className="flex-1">
      <div className="mb-6 flex items-center justify-between">
        <span className="text-sm text-gray-500">
          Showing {products.length} of {meta.total} products
        </span>
        <ProductsSortSelect />
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gray-200 px-6 py-20 text-gray-400">
          <PackageIcon size={44} />
          <p className="text-sm">No products match your filters.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlistedSet.has(product.id)}
              />
            ))}
          </div>

          <ShopPagination
            currentPage={meta.current_page}
            lastPage={meta.last_page}
          />
        </>
      )}
    </div>
  );
}
