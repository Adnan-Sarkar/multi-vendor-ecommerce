"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { Cart } from "@/services/cartService";
import type { Address } from "@/services/addressService";
import type { AppliedCoupon } from "@/actions/couponActions";
import {
  placeOrderAction,
  initiatePaymentAction,
} from "@/actions/orderActions";
import { AddressSelector } from "./AddressSelector";
import {
  PaymentMethodSelector,
  type PaymentMethod,
} from "./PaymentMethodSelector";
import { CheckoutOrderSummary } from "./CheckoutOrderSummary";

interface CheckoutFormProps {
  cart: Cart;
  addresses: Address[];
}

function resolveInitialAddressId(addresses: Address[]): number | null {
  if (addresses.length === 0) {
    return null;
  }

  const defaultAddress = addresses.find((address) => address.is_default);

  return (defaultAddress ?? addresses[0]).id;
}

export function CheckoutForm({ cart, addresses }: CheckoutFormProps) {
  const router = useRouter();
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    resolveInitialAddressId(addresses),
  );
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("sslcommerz");
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const [notes, setNotes] = useState("");
  const [isPlacing, startPlacing] = useTransition();

  const placeOrder = () => {
    if (!selectedAddressId) {
      toast.error("Please select a shipping address.");
      return;
    }

    startPlacing(async () => {
      const result = await placeOrderAction({
        shipping_address_id: selectedAddressId,
        payment_method: paymentMethod,
        coupon_code: appliedCoupon?.code ?? null,
        notes: notes.trim() || undefined,
      });

      if (!result.success || !result.order) {
        toast.error(result.message);
        return;
      }

      const orderId = result.order.id;

      if (paymentMethod === "sslcommerz") {
        const payment = await initiatePaymentAction(orderId);

        if (payment.success && payment.paymentUrl) {
          window.location.href = payment.paymentUrl;
          return;
        }

        toast.error(payment.message);
        router.push(`/orders/${orderId}`);
        return;
      }

      toast.success("Order placed successfully.");
      router.push(`/orders/${orderId}`);
    });
  };

  const canPlace = addresses.length > 0 && selectedAddressId !== null;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="space-y-8 lg:col-span-2">
        <section>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Shipping Address
          </h2>
          <AddressSelector
            addresses={addresses}
            selectedAddressId={selectedAddressId}
            onSelect={setSelectedAddressId}
          />
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Payment Method
          </h2>
          <PaymentMethodSelector
            value={paymentMethod}
            onChange={setPaymentMethod}
          />
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Order Notes
            <span className="ml-2 text-sm font-normal text-gray-400">
              (optional)
            </span>
          </h2>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={3}
            placeholder="Add delivery instructions or a note for the seller."
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/15"
          />
        </section>
      </div>

      <div className="lg:col-span-1">
        <CheckoutOrderSummary
          items={cart.items}
          subtotal={cart.total}
          appliedCoupon={appliedCoupon}
          paymentMethod={paymentMethod}
          isPlacing={isPlacing}
          canPlace={canPlace}
          onCouponApplied={setAppliedCoupon}
          onCouponRemoved={() => setAppliedCoupon(null)}
          onPlaceOrder={placeOrder}
        />
      </div>
    </div>
  );
}
