import Image from "next/image";
import { UserCircleIcon, ChatCircleIcon } from "@phosphor-icons/react/dist/ssr";
import { StarRating } from "@/components/shared/StarRating";
import type { ProductReview } from "@/services/productService";

interface ProductReviewsProps {
  reviews: ProductReview[];
  shopName?: string;
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

export function ProductReviews({ reviews, shopName }: ProductReviewsProps) {
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
                  {review.user?.avatar ? (
                    <Image
                      src={review.user.avatar}
                      alt={review.user.name ?? "Reviewer"}
                      width={36}
                      height={36}
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  ) : (
                    <UserCircleIcon size={36} className="text-gray-300" />
                  )}
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

              {review.vendor_reply && (
                <div className="mt-4 rounded-xl border border-indigo-100 bg-indigo-50/50 p-4">
                  <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-indigo-600">
                    <ChatCircleIcon size={14} weight="fill" />
                    {shopName ?? "Seller"}
                    <span className="font-normal text-indigo-400">
                      · {formatDate(review.vendor_replied_at ?? undefined)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{review.vendor_reply}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
