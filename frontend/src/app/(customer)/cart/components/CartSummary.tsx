"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRightIcon,
  ShieldCheckIcon,
  TruckIcon,
  ArrowUUpLeftIcon,
} from "@phosphor-icons/react";
import { formatMoney } from "@/lib/productPricing";
import type { AppliedCoupon } from "@/actions/couponActions";
import { CouponField } from "./CouponField";

interface CartSummaryProps {
  total: number;
  itemCount: number;
}

export function CartSummary({ total, itemCount }: CartSummaryProps) {
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);

  const discount = appliedCoupon?.discount ?? 0;
  const payableTotal = appliedCoupon ? appliedCoupon.finalTotal : total;

  return (
    <aside className="w-full shrink-0 lg:w-96">
      <div className="space-y-4 lg:sticky lg:top-24">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-gray-900">
            Order Summary
          </h2>

          <div className="mt-5">
            <CouponField
              applied={appliedCoupon}
              onApplied={setAppliedCoupon}
              onRemoved={() => setAppliedCoupon(null)}
            />
          </div>

          <div className="mt-5 space-y-3 border-t border-gray-100 pt-5 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">
                Subtotal · {itemCount} {itemCount === 1 ? "item" : "items"}
              </span>
              <span className="font-medium tabular-nums text-gray-900">
                {formatMoney(total)}
              </span>
            </div>

            {appliedCoupon && (
              <div className="flex items-center justify-between">
                <span className="text-gray-500">
                  Discount · {appliedCoupon.code}
                </span>
                <span className="font-medium tabular-nums text-green-600">
                  −{formatMoney(discount)}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-gray-500">Shipping</span>
              <span className="text-gray-400">Calculated at checkout</span>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between rounded-xl bg-indigo-50 px-4 py-3.5">
            <span className="text-sm font-semibold text-gray-900">Total</span>
            <span className="text-xl font-bold tabular-nums text-indigo-700">
              {formatMoney(payableTotal)}
            </span>
          </div>

          <Link
            href="/checkout"
            className="group mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            Proceed to Checkout
            <ArrowRightIcon
              size={16}
              weight="bold"
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div className="flex items-center justify-center gap-5 text-xs text-gray-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheckIcon size={15} />
            Secure
          </span>
          <span className="flex items-center gap-1.5">
            <TruckIcon size={15} />
            Fast delivery
          </span>
          <span className="flex items-center gap-1.5">
            <ArrowUUpLeftIcon size={15} />
            Easy returns
          </span>
        </div>
      </div>
    </aside>
  );
}
