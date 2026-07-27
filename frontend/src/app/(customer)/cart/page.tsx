import Link from "next/link";
import {
  ShoppingCartIcon,
  ArrowRightIcon,
} from "@phosphor-icons/react/dist/ssr";
import { getCart } from "@/services/cartService";
import { CartList } from "./components/CartList";
import { CartSummary } from "./components/CartSummary";

export default async function CartPage() {
  const cart = await getCart();
  const items = cart?.items ?? [];
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-extrabold tracking-tight text-gray-900">
        Shopping Cart
      </h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-gray-50/50 px-6 py-20 text-center">
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white text-gray-300 shadow-sm">
            <ShoppingCartIcon size={40} />
          </div>
          <h2 className="mb-2 text-xl font-bold text-gray-900">
            Your cart is empty
          </h2>
          <p className="mb-6 max-w-sm text-gray-500">
            Looks like you haven&apos;t added anything yet. Explore the store
            and find something you love.
          </p>
          <Link
            href="/shop"
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
          >
            Continue Shopping
            <ArrowRightIcon size={18} weight="bold" />
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:gap-12">
          <CartList items={items} />
          <CartSummary total={cart?.total ?? 0} itemCount={itemCount} />
        </div>
      )}
    </div>
  );
}
