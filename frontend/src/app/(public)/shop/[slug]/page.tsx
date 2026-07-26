import { notFound } from "next/navigation";
import {
  getProductBySlug,
  getProductReviews,
  getProductVariants,
} from "@/services/productService";
import { ProductGallery } from "./components/ProductGallery";
import { ProductInfo } from "./components/ProductInfo";
import { ProductVariants } from "./components/ProductVariants";
import { ProductReviews } from "./components/ProductReviews";

interface ProductDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const [variants, reviews] = await Promise.all([
    getProductVariants(slug),
    getProductReviews(slug),
  ]);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2">
        <ProductGallery
          thumbnail={product.thumbnail}
          images={product.images ?? []}
          name={product.name}
        />
        <ProductInfo product={product} />
      </div>

      {product.description && (
        <section className="mt-14">
          <h2 className="mb-4 text-xl font-bold text-gray-900">Description</h2>
          <p className="whitespace-pre-line leading-relaxed text-gray-600">
            {product.description}
          </p>
        </section>
      )}

      <ProductVariants variants={variants} />

      <ProductReviews reviews={reviews} />
    </div>
  );
}
