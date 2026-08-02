"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StarIcon, CheckIcon } from "@phosphor-icons/react";
import { ReviewFormModal } from "./ReviewFormModal";

interface OrderItemReviewButtonProps {
  orderId: number;
  productId: number;
  productName: string;
  alreadyReviewed?: boolean;
}

export function OrderItemReviewButton({
  orderId,
  productId,
  productName,
  alreadyReviewed = false,
}: OrderItemReviewButtonProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(alreadyReviewed);

  if (hasReviewed) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600">
        <CheckIcon size={14} weight="bold" />
        Reviewed
      </span>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-indigo-200 px-2.5 py-1 text-xs font-semibold text-indigo-600 transition-colors hover:bg-indigo-50"
      >
        <StarIcon size={14} weight="fill" />
        Review
      </button>

      {isOpen && (
        <ReviewFormModal
          orderId={orderId}
          productId={productId}
          productName={productName}
          onClose={() => setIsOpen(false)}
          onSubmitted={() => {
            setIsOpen(false);
            setHasReviewed(true);
            router.refresh();
          }}
        />
      )}
    </>
  );
}
