"use server";

import { revalidatePath } from "next/cache";
import { fetchServer } from "@/lib/api-server";

export interface VariantMutationResult {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export interface VariantPayload {
  price: number;
  stock_qty: number;
  in_stock: boolean;
  image?: string | null;
  attributes: number[];
}

function revalidateProduct(productId: number) {
  revalidatePath(`/dashboard/products/${productId}`);
}

export async function createVariantAction(
  productId: number,
  payload: VariantPayload,
): Promise<VariantMutationResult> {
  const response = await fetchServer(`/product/${productId}/variants`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  const body = await response.json().catch(() => null);

  if (!response.ok) {
    return {
      success: false,
      message: body?.message ?? "Failed to add variant.",
      errors: body?.errors,
    };
  }

  revalidateProduct(productId);
  return {
    success: true,
    message: body?.message ?? "Variant added successfully.",
  };
}

export async function updateVariantAction(
  productId: number,
  variantId: number,
  payload: VariantPayload,
): Promise<VariantMutationResult> {
  const response = await fetchServer(
    `/product/${productId}/variants/${variantId}`,
    {
      method: "PATCH",
      body: JSON.stringify(payload),
    },
  );
  const body = await response.json().catch(() => null);

  if (!response.ok) {
    return {
      success: false,
      message: body?.message ?? "Failed to update variant.",
      errors: body?.errors,
    };
  }

  revalidateProduct(productId);
  return {
    success: true,
    message: body?.message ?? "Variant updated successfully.",
  };
}

export async function deleteVariantAction(
  productId: number,
  variantId: number,
): Promise<VariantMutationResult> {
  const response = await fetchServer(
    `/product/${productId}/variants/${variantId}`,
    { method: "DELETE" },
  );
  const body = await response.json().catch(() => null);

  if (!response.ok) {
    return {
      success: false,
      message: body?.message ?? "Failed to delete variant.",
    };
  }

  revalidateProduct(productId);
  return {
    success: true,
    message: body?.message ?? "Variant deleted successfully.",
  };
}
