"use client";

import { useState } from "react";
import { MinusIcon, PlusIcon, ShoppingCartIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import { useCartStore } from "@/store/useCartStore";
import { getEffectivePrice } from "@/lib/productPricing";
import type { PublicProduct } from "@/services/productService";

interface AddToCartFormProps {
  product: PublicProduct;
}

export function AddToCartForm({ product }: AddToCartFormProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const decreaseQuantity = () => setQuantity((current) => Math.max(1, current - 1));
  const increaseQuantity = () => setQuantity((current) => current + 1);

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

    toast.success(`${quantity} × ${product.name} added to cart.`);
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
        disabled={!product.in_stock}
        className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        <ShoppingCartIcon size={20} weight="fill" />
        {product.in_stock ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
}
