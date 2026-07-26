"use client";

import { ShoppingCartIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import { useCartStore } from "@/store/useCartStore";
import { getEffectivePrice } from "@/lib/productPricing";
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
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        slug: product.slug,
        name: product.name,
        short_description: product.short_description,
        price: getEffectivePrice(product),
        thumbnail: product.thumbnail ?? "",
        category: product.categories?.[0]?.name ?? "",
        in_stock: product.in_stock,
        rating: 0,
      },
      quantity,
    );

    toast.success(`${product.name} added to cart.`);
  };

  if (variant === "full") {
    return (
      <button
        onClick={handleAddToCart}
        disabled={!product.in_stock}
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
      disabled={!product.in_stock}
      title="Add to cart"
      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-900 transition-colors hover:bg-indigo-600 hover:text-white disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-300"
    >
      <ShoppingCartIcon size={20} weight="fill" />
    </button>
  );
}
