"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCartIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import { addToCartAction } from "@/actions/cartActions";
import type { PublicProduct } from "@/services/productService";

interface AddToCartButtonProps {
  product: PublicProduct;
  variant?: "icon" | "full";
  quantity?: number;
}

export function AddToCartButton({
  product,
  variant = "icon",
  quantity = 1,
}: AddToCartButtonProps) {
  const router = useRouter();
  const [isAdding, startAdding] = useTransition();

  const handleAddToCart = () => {
    startAdding(async () => {
      const result = await addToCartAction(product.id, quantity);

      if (result.requiresAuth) {
        toast.error(result.message);
        router.push("/login");
        return;
      }

      if (result.success) {
        toast.success(`${product.name} added to cart.`);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  if (variant === "full") {
    return (
      <button
        onClick={handleAddToCart}
        disabled={!product.in_stock || isAdding}
        className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        <ShoppingCartIcon size={20} weight="fill" />
        Add to Cart
      </button>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={!product.in_stock || isAdding}
      title="Add to cart"
      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-900 transition-colors hover:bg-indigo-600 hover:text-white disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-300"
    >
      <ShoppingCartIcon size={20} weight="fill" />
    </button>
  );
}
