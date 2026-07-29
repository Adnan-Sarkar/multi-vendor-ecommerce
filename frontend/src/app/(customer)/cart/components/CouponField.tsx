"use client";

import { useState, useTransition } from "react";
import { TagIcon, CheckCircleIcon, XIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import { formatMoney } from "@/lib/productPricing";
import { applyCouponAction, type AppliedCoupon } from "@/actions/couponActions";

interface CouponFieldProps {
  applied: AppliedCoupon | null;
  onApplied: (coupon: AppliedCoupon) => void;
  onRemoved: () => void;
}

export function CouponField({ applied, onApplied, onRemoved }: CouponFieldProps) {
  const [couponCode, setCouponCode] = useState("");
  const [isApplying, startApplying] = useTransition();

  const applyCoupon = () => {
    const trimmedCode = couponCode.trim();

    if (!trimmedCode) {
      return;
    }

    startApplying(async () => {
      const result = await applyCouponAction(trimmedCode);

      if (result.success && result.coupon) {
        toast.success(result.message);
        onApplied(result.coupon);
        setCouponCode("");
      } else {
        toast.error(result.message);
      }
    });
  };

  const removeCoupon = () => {
    onRemoved();
    setCouponCode("");
  };

  if (applied) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-lg border border-green-200 bg-green-50 px-3 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <CheckCircleIcon
            size={18}
            weight="fill"
            className="shrink-0 text-green-600"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-green-800">
              {applied.code}
            </p>
            <p className="text-xs text-green-600">
              You saved {formatMoney(applied.discount)}
            </p>
          </div>
        </div>

        <button
          onClick={removeCoupon}
          title="Remove coupon"
          className="shrink-0 cursor-pointer rounded-md p-1 text-green-700 transition-colors hover:bg-green-100"
        >
          <XIcon size={16} weight="bold" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-gray-500">
        <TagIcon size={13} />
        Have a coupon?
      </label>

      <div className="flex gap-2">
        <input
          type="text"
          value={couponCode}
          onChange={(event) => setCouponCode(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              applyCoupon();
            }
          }}
          placeholder="Enter code"
          className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm uppercase tracking-wide outline-none transition-colors placeholder:normal-case placeholder:tracking-normal focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/15"
        />
        <button
          onClick={applyCoupon}
          disabled={!couponCode.trim() || isApplying}
          className="shrink-0 cursor-pointer rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isApplying ? "Applying…" : "Apply"}
        </button>
      </div>
    </div>
  );
}
