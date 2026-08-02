"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { EyeIcon, CheckCircleIcon, PackageIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import { DataTable, type Column } from "@/components/ui";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { AdminReview } from "@/services/adminReviewService";
import type { PaginationMeta } from "@/services/vendorProductService";
import { approveReviewAction } from "@/actions/adminReviewActions";
import { ReviewStars } from "./ReviewStars";
import { ReviewDetailModal } from "./ReviewDetailModal";

interface AdminReviewsTableProps {
  reviews: AdminReview[];
  meta: PaginationMeta;
}

function formatDate(value?: string): string {
  if (!value) {
    return "—";
  }

  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function AdminReviewsTable({ reviews, meta }: AdminReviewsTableProps) {
  const router = useRouter();
  const [selectedReview, setSelectedReview] = useState<AdminReview | null>(null);
  const [processingReviewId, setProcessingReviewId] = useState<number | null>(
    null,
  );
  const [isProcessing, startProcessing] = useTransition();

  const approveReview = (reviewId: number) => {
    setProcessingReviewId(reviewId);
    startProcessing(async () => {
      const result = await approveReviewAction(reviewId);

      if (result.success) {
        toast.success(result.message);
        setSelectedReview(null);
        router.refresh();
      } else {
        toast.error(result.message);
      }

      setProcessingReviewId(null);
    });
  };

  const isReviewProcessing = (reviewId: number) =>
    isProcessing && processingReviewId === reviewId;

  const columns: Column<AdminReview>[] = [
    {
      header: "Product",
      cell: (review) => (
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100 text-gray-400">
            {review.product?.thumbnail ? (
              <Image
                src={review.product.thumbnail}
                alt={review.product.name}
                width={44}
                height={44}
                className="h-full w-full object-cover"
              />
            ) : (
              <PackageIcon size={20} />
            )}
          </div>
          <div className="min-w-0">
            <p className="truncate font-bold text-gray-900">
              {review.product?.name ?? "—"}
            </p>
            {review.product?.vendor?.shop_name && (
              <p className="truncate text-xs text-gray-400">
                {review.product.vendor.shop_name}
              </p>
            )}
          </div>
        </div>
      ),
    },
    {
      header: "Customer",
      cell: (review) => review.user?.name ?? "—",
    },
    {
      header: "Rating",
      cell: (review) => <ReviewStars rating={review.rating} />,
    },
    {
      header: "Review",
      cell: (review) => (
        <div className="max-w-xs">
          {review.title && (
            <p className="truncate font-medium text-gray-900">
              {review.title}
            </p>
          )}
          <p className="truncate text-xs text-gray-500">
            {review.body ?? "No written review."}
          </p>
          {review.vendor_reply && (
            <span className="mt-1 inline-flex items-center rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-medium text-indigo-600">
              Vendor replied
            </span>
          )}
        </div>
      ),
    },
    {
      header: "Status",
      cell: (review) => (
        <StatusBadge status={review.is_approved ? "approved" : "pending"} />
      ),
    },
    {
      header: "Submitted",
      cell: (review) => formatDate(review.created_at),
    },
    {
      header: "Actions",
      align: "right",
      cell: (review) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => setSelectedReview(review)}
            title="View review"
            className="cursor-pointer rounded-lg p-2 text-gray-400 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
          >
            <EyeIcon size={20} />
          </button>
          {!review.is_approved && (
            <button
              onClick={() => approveReview(review.id)}
              disabled={isReviewProcessing(review.id)}
              title="Approve review"
              className="cursor-pointer rounded-lg p-2 text-gray-400 transition-colors hover:bg-green-50 hover:text-green-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CheckCircleIcon size={20} />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={reviews}
        rowKey={(review) => review.id}
        title={`Reviews (${meta.total})`}
        emptyMessage="No reviews found."
        meta={meta}
      />

      {selectedReview && (
        <ReviewDetailModal
          key={selectedReview.id}
          review={selectedReview}
          busy={isReviewProcessing(selectedReview.id)}
          onClose={() => setSelectedReview(null)}
          onApprove={approveReview}
        />
      )}
    </>
  );
}
