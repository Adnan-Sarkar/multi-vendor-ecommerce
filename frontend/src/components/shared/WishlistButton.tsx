"use client";

import { useState } from "react";
import { HeartIcon } from "@phosphor-icons/react";

interface WishlistButtonProps {
  productId: number;
}

export function WishlistButton({ productId }: WishlistButtonProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = () => {
    void productId;
    setIsWishlisted((current) => !current);
  };

  return (
    <button
      onClick={toggleWishlist}
      title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-sm backdrop-blur transition-colors hover:bg-white hover:text-red-500"
    >
      <HeartIcon
        size={18}
        weight={isWishlisted ? "fill" : "regular"}
        className={isWishlisted ? "text-red-500" : ""}
      />
    </button>
  );
}
