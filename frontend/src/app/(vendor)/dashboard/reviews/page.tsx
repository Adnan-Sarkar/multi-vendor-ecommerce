import { ChatCircleIcon, StarIcon } from "@phosphor-icons/react/dist/ssr";
import { Pagination } from "@/components/ui/Pagination";
import { getMyProducts } from "@/services/vendorProductService";
import { getVendorProductReviews } from "@/services/vendorReviewService";
import { ProductReviewSelector } from "./components/ProductReviewSelector";
import { VendorReviewCard } from "./components/VendorReviewCard";

interface VendorReviewsPageProps {
  searchParams: Promise<{ product?: string; page?: string }>;
}

export default async function VendorReviewsPage({
  searchParams,
}: VendorReviewsPageProps) {
  const { product, page } = await searchParams;
  const { data: products } = await getMyProducts(1);

  if (products.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
          <p className="mt-1 text-sm text-gray-500">
            See customer reviews on your products and reply once to each.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gray-200 px-6 py-16 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-indigo-400">
            <StarIcon size={26} />
          </span>
          <p className="text-sm text-gray-500">
            Add products first to start receiving reviews.
          </p>
        </div>
      </div>
    );
  }

  const selectedProductId = product ? Number(product) : products[0].id;
  const currentPage = Number(page) || 1;
  const { data: reviews, meta } = await getVendorProductReviews(
    selectedProductId,
    currentPage,
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
        <p className="mt-1 text-sm text-gray-500">
          See customer reviews on your products and reply once to each.
        </p>
      </div>

      <ProductReviewSelector
        products={products.map((item) => ({ id: item.id, name: item.name }))}
        selectedProductId={selectedProductId}
      />

      {reviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gray-200 px-6 py-16 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
            <ChatCircleIcon size={26} />
          </span>
          <p className="text-sm text-gray-500">
            No reviews for this product yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <VendorReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}

      {meta.last_page > 1 && (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <Pagination
            currentPage={meta.current_page}
            lastPage={meta.last_page}
            total={meta.total}
            from={meta.from}
            to={meta.to}
          />
        </div>
      )}
    </div>
  );
}
