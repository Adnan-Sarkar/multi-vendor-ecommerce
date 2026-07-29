"use client";

import { useState } from "react";
import Link from "next/link";
import { HeartIcon } from "@phosphor-icons/react";
import { ProductCard } from "@/components/shared/ProductCard";
import type { WishlistItem } from "@/services/wishlistService";

interface WishlistGridProps {
  items: WishlistItem[];
}

export function WishlistGrid({ items }: WishlistGridProps) {
  const [products, setProducts] = useState(items.map((item) => item.product));

  const removeProduct = (productId: number) => {
    setProducts((current) =>
      current.filter((product) => product.id !== productId),
    );
  };

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-gray-200 px-6 py-20 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-400">
          <HeartIcon size={32} />
        </span>
        <p className="text-sm text-gray-500">Your wishlist is empty.</p>
        <Link
          href="/shop"
          className="cursor-pointer rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
        >
          Explore products
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isWishlisted
          onWishlistChange={(active) => {
            if (!active) {
              removeProduct(product.id);
            }
          }}
        />
      ))}
    </div>
  );
}
