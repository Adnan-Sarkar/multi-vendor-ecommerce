"use server";

import { revalidatePath } from "next/cache";
import { fetchServer } from "@/lib/api-server";

export interface WishlistActionResult {
  success: boolean;
  message: string;
  requiresAuth?: boolean;
}

export async function addToWishlistAction(
  productId: number,
): Promise<WishlistActionResult> {
  const response = await fetchServer("/wishlist", {
    method: "POST",
    body: JSON.stringify({ product_id: productId }),
  });

  const body = await response.json().catch(() => null);

  if (response.status === 401 || response.status === 403) {
    return {
      success: false,
      requiresAuth: true,
      message: "Please log in as a customer to save items.",
    };
  }

  if (!response.ok) {
    return {
      success: false,
      message: body?.message ?? "Failed to add to wishlist.",
    };
  }

  revalidatePath("/wishlist");

  return {
    success: true,
    message: body?.message ?? "Added to wishlist.",
  };
}

export async function removeFromWishlistAction(
  productId: number,
): Promise<WishlistActionResult> {
  const response = await fetchServer(`/wishlist/${productId}`, {
    method: "DELETE",
  });

  const body = await response.json().catch(() => null);

  if (response.status === 401 || response.status === 403) {
    return {
      success: false,
      requiresAuth: true,
      message: "Please log in as a customer to manage your wishlist.",
    };
  }

  if (!response.ok) {
    return {
      success: false,
      message: body?.message ?? "Failed to remove from wishlist.",
    };
  }

  revalidatePath("/wishlist");

  return {
    success: true,
    message: body?.message ?? "Removed from wishlist.",
  };
}
