"use client";

import { useState, useTransition } from "react";
import { StarIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import { Button, Modal } from "@/components/ui";
import { createReviewAction } from "@/actions/reviewActions";

interface ReviewFormModalProps {
  orderId: number;
  productId: number;
  productName: string;
  onClose: () => void;
  onSubmitted: () => void;
}

export function ReviewFormModal({
  orderId,
  productId,
  productName,
  onClose,
  onSubmitted,
}: ReviewFormModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isSubmitting, startSubmitting] = useTransition();

  const submitReview = () => {
    if (rating < 1) {
      toast.error("Please select a rating.");
      return;
    }

    if (title.trim() && title.trim().length < 5) {
      toast.error("Title must be at least 5 characters.");
      return;
    }

    if (body.trim() && body.trim().length < 10) {
      toast.error("Review must be at least 10 characters.");
      return;
    }

    startSubmitting(async () => {
      const result = await createReviewAction({
        order_id: orderId,
        product_id: productId,
        rating,
        title: title.trim() || undefined,
        body: body.trim() || undefined,
      });

      if (result.success) {
        toast.success(result.message);

        onSubmitted();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Modal
      open
      onClose={onClose}
      size="md"
      title="Write a review"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={submitReview}
            pending={isSubmitting}
            pendingLabel="Submitting..."
          >
            Submit review
          </Button>
        </>
      }
    >
      <div className="space-y-5">
        <p className="text-sm text-gray-500">
          Reviewing{" "}
          <span className="font-semibold text-gray-900">{productName}</span>
        </p>

        <div>
          <p className="mb-1.5 text-sm font-medium text-slate-700">Rating</p>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                onMouseEnter={() => setHoverRating(value)}
                onMouseLeave={() => setHoverRating(0)}
                className="cursor-pointer p-0.5"
                title={`${value} star${value > 1 ? "s" : ""}`}
              >
                <StarIcon
                  size={28}
                  weight={value <= (hoverRating || rating) ? "fill" : "regular"}
                  className={
                    value <= (hoverRating || rating)
                      ? "text-amber-400"
                      : "text-gray-300"
                  }
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="review-title"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Title
            <span className="ml-2 text-xs font-normal text-gray-400">
              (optional)
            </span>
          </label>
          <input
            id="review-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Sum up your experience"
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15"
          />
        </div>

        <div>
          <label
            htmlFor="review-body"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Review
            <span className="ml-2 text-xs font-normal text-gray-400">
              (optional)
            </span>
          </label>
          <textarea
            id="review-body"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            rows={4}
            placeholder="What did you like or dislike?"
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15"
          />
        </div>
      </div>
    </Modal>
  );
}
