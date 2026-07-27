"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { MinusIcon, PlusIcon, ShoppingCartIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import { addToCartAction } from "@/actions/cartActions";
import type { PublicProduct } from "@/services/productService";

interface AddToCartFormProps {
  product: PublicProduct;
}

export function AddToCartForm({ product }: AddToCartFormProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, startAdding] = useTransition();

  const decreaseQuantity = () =>
    setQuantity((current) => Math.max(1, current - 1));
  const increaseQuantity = () => setQuantity((current) => current + 1);

  const handleAddToCart = () => {
    startAdding(async () => {
      const result = await addToCartAction(product.id, quantity);

      if (result.requiresAuth) {
        toast.error(result.message);

        router.push("/login");

        return;
      }

      if (result.success) {
        toast.success(`${quantity} × ${product.name} added to cart.`);

        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="mt-8 flex flex-col gap-4 sm:flex-row">
      <div className="flex items-center rounded-xl border border-gray-200">
        <button
          onClick={decreaseQuantity}
          disabled={quantity <= 1}
          className="flex h-12 w-12 cursor-pointer items-center justify-center text-gray-600 transition-colors hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <MinusIcon size={18} weight="bold" />
        </button>
        <span className="w-12 text-center font-semibold text-gray-900">
          {quantity}
        </span>
        <button
          onClick={increaseQuantity}
          className="flex h-12 w-12 cursor-pointer items-center justify-center text-gray-600 transition-colors hover:text-gray-900"
        >
          <PlusIcon size={18} weight="bold" />
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={!product.in_stock || isAdding}
        className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        <ShoppingCartIcon size={20} weight="fill" />
        {product.in_stock ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
}
