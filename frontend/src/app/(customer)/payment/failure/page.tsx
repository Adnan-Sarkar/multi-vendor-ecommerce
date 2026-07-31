import Link from "next/link";
import type { Metadata } from "next";
import { XCircleIcon } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Payment Failed | MultiVendor",
};

export default function PaymentFailurePage() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-4 px-4 py-24 text-center">
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-500">
        <XCircleIcon size={44} weight="fill" />
      </span>
      <h1 className="text-2xl font-bold text-gray-900">Payment failed</h1>
      <p className="text-sm text-gray-500">
        Your payment could not be completed. Your order is saved as unpaid — you
        can retry payment from your orders.
      </p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/orders"
          className="cursor-pointer rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
        >
          View my orders
        </Link>
        <Link
          href="/cart"
          className="cursor-pointer rounded-full border border-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
        >
          Back to cart
        </Link>
      </div>
    </div>
  );
}
