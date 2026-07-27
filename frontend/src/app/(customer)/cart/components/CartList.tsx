"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { clearCartAction } from "@/actions/cartActions";
import type { CartItem } from "@/services/cartService";
import { CartItemRow } from "./CartItemRow";

interface CartListProps {
  items: CartItem[];
}

export function CartList({ items }: CartListProps) {
  const router = useRouter();
  const [isClearing, startClearing] = useTransition();

  const clearCart = () => {
    startClearing(async () => {
      const result = await clearCartAction();

      if (result.success) {
        toast.success(result.message);

        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="w-full min-w-0 flex-1">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">
          {items.length} {items.length === 1 ? "item" : "items"} in your cart
        </p>

        <button
          onClick={clearCart}
          disabled={isClearing}
          className="cursor-pointer text-sm font-medium text-gray-400 transition-colors hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Clear cart
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <CartItemRow key={`${item.id}-${item.quantity}`} item={item} />
        ))}
      </div>
    </div>
  );
}
