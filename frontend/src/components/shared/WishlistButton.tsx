"use client";

import { useState, useTransition } from "react";
import { HeartIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import {
  addToWishlistAction,
  removeFromWishlistAction,
} from "@/actions/wishlistActions";

interface WishlistButtonProps {
  productId: number;
  initialActive?: boolean;
  onChange?: (active: boolean) => void;
}

export function WishlistButton({
  productId,
  initialActive = false,
  onChange,
}: WishlistButtonProps) {
  const [isWishlisted, setIsWishlisted] = useState(initialActive);
  const [isPending, startTransition] = useTransition();

  const toggleWishlist = () => {
    const nextActive = !isWishlisted;
    setIsWishlisted(nextActive);

    startTransition(async () => {
      const result = nextActive
        ? await addToWishlistAction(productId)
        : await removeFromWishlistAction(productId);

      if (result.success) {
        toast.success(result.message);

        onChange?.(nextActive);
      } else {
        setIsWishlisted(!nextActive);

        toast.error(result.message);
      }
    });
  };

  return (
    <button
      onClick={toggleWishlist}
      disabled={isPending}
      title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-sm backdrop-blur transition-colors hover:bg-white hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <HeartIcon
        size={18}
        weight={isWishlisted ? "fill" : "regular"}
        className={isWishlisted ? "text-red-500" : ""}
      />
    </button>
  );
}
