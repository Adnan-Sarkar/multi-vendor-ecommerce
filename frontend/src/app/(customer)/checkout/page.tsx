import Link from "next/link";
import type { Metadata } from "next";
import { ShoppingBagIcon } from "@phosphor-icons/react/dist/ssr";
import { getCart } from "@/services/cartService";
import { getAddresses } from "@/services/addressService";
import { CheckoutForm } from "./components/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout | MultiVendor",
  description: "Review your order and complete your purchase.",
};

export default async function CheckoutPage() {
  const [cart, addresses] = await Promise.all([getCart(), getAddresses()]);

  if (!cart || cart.items.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-4 px-4 py-24 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-indigo-400">
          <ShoppingBagIcon size={32} />
        </span>
        <h1 className="text-2xl font-bold text-gray-900">Your cart is empty</h1>
        <p className="text-sm text-gray-500">
          Add some products before heading to checkout.
        </p>
        <Link
          href="/shop"
          className="mt-2 cursor-pointer rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-gray-900">
        Checkout
      </h1>

      <CheckoutForm cart={cart} addresses={addresses} />
    </div>
  );
}
