import { UserCircleIcon } from "@phosphor-icons/react/dist/ssr";
import { StarRating } from "@/components/shared/StarRating";
import type { ProductReview } from "@/services/productService";

interface ProductReviewsProps {
  reviews: ProductReview[];
}

function formatDate(value: string | undefined): string {
  if (!value) {
    return "";
  }

  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function ProductReviews({ reviews }: ProductReviewsProps) {
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((total, review) => total + review.rating, 0) /
        reviews.length
      : 0;

  return (
    <section className="mt-14 border-t border-gray-100 pt-12">
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <h2 className="text-xl font-bold text-gray-900">Customer Reviews</h2>

        {reviews.length > 0 && (
          <div className="flex items-center gap-2">
            <StarRating rating={averageRating} size={18} />
            <span className="text-sm font-medium text-gray-500">
              {averageRating.toFixed(1)} ({reviews.length} reviews)
            </span>
          </div>
        )}
      </div>

      {reviews.length === 0 ? (
        <p className="text-sm text-gray-400">
          No reviews yet. Be the first to review this product.
        </p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <div className="mb-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <UserCircleIcon size={36} className="text-gray-300" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {review.user?.name ?? "Anonymous"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {formatDate(review.created_at)}
                    </p>
                  </div>
                </div>

                <StarRating rating={review.rating} />
              </div>

              {review.title && (
                <p className="mb-1 font-semibold text-gray-900">
                  {review.title}
                </p>
              )}

              {review.body && (
                <p className="text-sm leading-relaxed text-gray-600">
                  {review.body}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
