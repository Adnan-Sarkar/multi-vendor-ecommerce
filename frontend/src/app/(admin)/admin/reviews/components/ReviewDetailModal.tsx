"use client";

import Image from "next/image";
import { PackageIcon } from "@phosphor-icons/react";
import { Button, Modal } from "@/components/ui";
import type { AdminReview } from "@/services/adminReviewService";
import { ReviewStars } from "./ReviewStars";

interface ReviewDetailModalProps {
  review: AdminReview;
  busy: boolean;
  onClose: () => void;
  onApprove: (reviewId: number) => void;
}

export function ReviewDetailModal({
  review,
  busy,
  onClose,
  onApprove,
}: ReviewDetailModalProps) {
  return (
    <Modal
      open
      onClose={onClose}
      size="md"
      title="Review"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {!review.is_approved && (
            <Button
              onClick={() => onApprove(review.id)}
              pending={busy}
              pendingLabel="Approving..."
            >
              Approve
            </Button>
          )}
        </>
      }
    >
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
            {review.product?.thumbnail ? (
              <Image
                src={review.product.thumbnail}
                alt={review.product.name}
                fill
                sizes="56px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-300">
                <PackageIcon size={22} />
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="truncate font-semibold text-gray-900">
              {review.product?.name ?? "Product"}
            </p>
            <p className="text-xs text-gray-400">
              by {review.user?.name ?? "Customer"}
            </p>
          </div>
        </div>

        <ReviewStars rating={review.rating} />

        {review.title && (
          <p className="font-semibold text-gray-900">{review.title}</p>
        )}

        {review.body ? (
          <p className="text-sm leading-relaxed text-gray-600">{review.body}</p>
        ) : (
          <p className="text-sm text-gray-400">No written review.</p>
        )}
      </div>
    </Modal>
  );
}
