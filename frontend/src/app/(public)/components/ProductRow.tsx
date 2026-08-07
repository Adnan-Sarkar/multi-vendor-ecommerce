import type { PublicProduct } from "@/services/productService";
import { ProductCard } from "@/components/shared/ProductCard";
import { SectionHeading } from "./SectionHeading";

interface ProductRowProps {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  products: PublicProduct[];
  wishlistedProductIds: number[];
}

export function ProductRow({
  title,
  subtitle,
  viewAllHref,
  products,
  wishlistedProductIds,
}: ProductRowProps) {
  if (products.length === 0) {
    return null;
  }

  const wishlistedSet = new Set(wishlistedProductIds);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        title={title}
        subtitle={subtitle}
        viewAllHref={viewAllHref}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isWishlisted={wishlistedSet.has(product.id)}
          />
        ))}
      </div>
    </section>
  );
}
