"use server";

import { revalidatePath } from "next/cache";
import { fetchServer } from "@/lib/api-server";

export interface CartActionResult {
  success: boolean;
  message: string;
  requiresAuth?: boolean;
}

function buildResult(
  response: Response,
  body: { message?: string } | null,
  successMessage: string,
  failureMessage: string,
): CartActionResult {
  if (response.status === 401) {
    return {
      success: false,
      requiresAuth: true,
      message: "Please log in to use your cart.",
    };
  }

  if (!response.ok) {
    return { success: false, message: body?.message ?? failureMessage };
  }

  revalidatePath("/cart");
  return { success: true, message: body?.message ?? successMessage };
}

export async function addToCartAction(
  productId: number,
  quantity: number,
  variantId?: number | null,
): Promise<CartActionResult> {
  const payload = {
    product_id: productId,
    quantity,
    variant_id: variantId ?? null,
  };

  const response = await fetchServer("/cart", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  const body = await response.json().catch(() => null);

  return buildResult(
    response,
    body,
    "Added to cart.",
    "Failed to add to cart.",
  );
}

export async function updateCartItemAction(
  cartItemId: number,
  quantity: number,
): Promise<CartActionResult> {
  const response = await fetchServer(`/cart/${cartItemId}`, {
    method: "PATCH",
    body: JSON.stringify({ quantity }),
  });

  const body = await response.json().catch(() => null);

  return buildResult(response, body, "Cart updated.", "Failed to update cart.");
}

export async function removeCartItemAction(
  cartItemId: number,
): Promise<CartActionResult> {
  const response = await fetchServer(`/cart/${cartItemId}`, {
    method: "DELETE",
  });

  const body = await response.json().catch(() => null);

  return buildResult(response, body, "Item removed.", "Failed to remove item.");
}

export async function clearCartAction(): Promise<CartActionResult> {
  const response = await fetchServer("/cart", { method: "DELETE" });
  const body = await response.json().catch(() => null);

  return buildResult(response, body, "Cart cleared.", "Failed to clear cart.");
}
