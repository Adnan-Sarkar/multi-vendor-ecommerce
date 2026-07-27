"use client";

import { useState } from "react";
import { TagIcon } from "@phosphor-icons/react";
import { toast } from "sonner";

export function CouponField() {
  const [couponCode, setCouponCode] = useState("");

  const applyCoupon = () => {
    if (!couponCode.trim()) {
      return;
    }

    toast.info("You can apply this coupon at checkout.");
  };

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
          placeholder="Enter code"
          className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm uppercase tracking-wide outline-none transition-colors placeholder:normal-case placeholder:tracking-normal focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/15"
        />
        <button
          onClick={applyCoupon}
          disabled={!couponCode.trim()}
          className="shrink-0 cursor-pointer rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
