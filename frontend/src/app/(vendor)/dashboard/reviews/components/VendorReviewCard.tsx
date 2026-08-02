"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ChatCircleIcon, UserCircleIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import { Button } from "@/components/ui";
import { StarRating } from "@/components/shared/StarRating";
import { replyToReviewAction } from "@/actions/vendorReviewActions";
import type { VendorReview } from "@/services/vendorReviewService";

interface VendorReviewCardProps {
  review: VendorReview;
}

function formatDate(value?: string | null): string {
  if (!value) {
    return "";
  }

  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function VendorReviewCard({ review }: VendorReviewCardProps) {
  const router = useRouter();
  const [reply, setReply] = useState("");
  const [isSending, startSending] = useTransition();

  const sendReply = () => {
    if (reply.trim().length < 2) {
      toast.error("Reply must be at least 2 characters.");
      return;
    }

    startSending(async () => {
      const result = await replyToReviewAction(review.id, reply.trim());

      if (result.success) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-400">
            <UserCircleIcon size={22} />
          </span>
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {review.user?.name ?? "Customer"}
            </p>
            <p className="text-xs text-gray-400">
              {formatDate(review.created_at)}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <StarRating rating={review.rating} size={15} />
          {!review.is_approved && (
            <span className="text-[11px] font-medium text-amber-600">
              Pending approval
            </span>
          )}
        </div>
      </div>

      {review.title && (
        <p className="mt-3 font-semibold text-gray-900">{review.title}</p>
      )}
      {review.body && (
        <p className="mt-1 text-sm leading-relaxed text-gray-600">
          {review.body}
        </p>
      )}

      {review.vendor_reply ? (
        <div className="mt-4 rounded-xl border border-indigo-100 bg-indigo-50/50 p-4">
          <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-indigo-600">
            <ChatCircleIcon size={14} weight="fill" />
            Your reply
            <span className="font-normal text-indigo-400">
              · {formatDate(review.vendor_replied_at)}
            </span>
          </div>
          <p className="text-sm text-gray-700">{review.vendor_reply}</p>
        </div>
      ) : (
        <div className="mt-4">
          <textarea
            value={reply}
            onChange={(event) => setReply(event.target.value)}
            rows={2}
            placeholder="Write a reply to this customer (you can only reply once)"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/15"
          />
          <div className="mt-2 flex justify-end">
            <Button size="sm" onClick={sendReply} pending={isSending}>
              Send reply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
