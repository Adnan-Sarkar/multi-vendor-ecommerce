"use client";

import Image from "next/image";
import { PackageIcon, LockSimpleIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui";
import { formatMoney } from "@/lib/productPricing";
import type { CartItem } from "@/services/cartService";
import type { AppliedCoupon } from "@/actions/couponActions";
import { CouponField } from "../../cart/components/CouponField";
import type { PaymentMethod } from "./PaymentMethodSelector";

interface CheckoutOrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  appliedCoupon: AppliedCoupon | null;
  paymentMethod: PaymentMethod;
  isPlacing: boolean;
  canPlace: boolean;
  onCouponApplied: (coupon: AppliedCoupon) => void;
  onCouponRemoved: () => void;
  onPlaceOrder: () => void;
}

export function CheckoutOrderSummary({
  items,
  subtotal,
  appliedCoupon,
  paymentMethod,
  isPlacing,
  canPlace,
  onCouponApplied,
  onCouponRemoved,
  onPlaceOrder,
}: CheckoutOrderSummaryProps) {
  const discount = appliedCoupon?.discount ?? 0;
  const payableTotal = appliedCoupon ? appliedCoupon.finalTotal : subtotal;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:sticky lg:top-24">
      <h2 className="text-base font-semibold text-gray-900">Order Summary</h2>

      <div className="mt-5 max-h-72 space-y-4 overflow-y-auto pr-1">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
              {item.product.primary_image || item.product.thumbnail ? (
                <Image
                  src={
                    (item.product.primary_image ??
                      item.product.thumbnail) as string
                  }
                  alt={item.product.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-gray-300">
                  <PackageIcon size={22} />
                </div>
              )}
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-800 px-1 text-[10px] font-bold text-white">
                {item.quantity}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900">
                {item.product.name}
              </p>
              <p className="mt-1 text-sm font-semibold tabular-nums text-gray-900">
                {formatMoney(item.subtotal)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 border-t border-gray-100 pt-5">
        <CouponField
          applied={appliedCoupon}
          onApplied={onCouponApplied}
          onRemoved={onCouponRemoved}
        />
      </div>

      <div className="mt-5 space-y-3 border-t border-gray-100 pt-5 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-medium tabular-nums text-gray-900">
            {formatMoney(subtotal)}
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
          <span className="text-gray-400">Free</span>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between rounded-xl bg-indigo-50 px-4 py-3.5">
        <span className="text-sm font-semibold text-gray-900">Total</span>
        <span className="text-xl font-bold tabular-nums text-indigo-700">
          {formatMoney(payableTotal)}
        </span>
      </div>

      <Button
        type="button"
        fullWidth
        className="mt-5"
        onClick={onPlaceOrder}
        disabled={!canPlace}
        pending={isPlacing}
        pendingLabel="Processing..."
      >
        {paymentMethod === "sslcommerz" ? "Proceed to Payment" : "Place Order"}
      </Button>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-gray-400">
        <LockSimpleIcon size={14} />
        Secure checkout
      </p>
    </div>
  );
}
