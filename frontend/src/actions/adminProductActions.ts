"use server";

import { revalidatePath } from "next/cache";
import { fetchServer } from "@/lib/api-server";

export interface AdminProductActionResult {
  success: boolean;
  message: string;
}

export async function approveProductAction(
  productId: number,
): Promise<AdminProductActionResult> {
  const response = await fetchServer(`/admin/products/${productId}/approve`, {
    method: "POST",
  });

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    return {
      success: false,
      message: body?.message ?? "Failed to approve product.",
    };
  }

  revalidatePath("/admin/products");
  return {
    success: true,
    message: body?.message ?? "Product approved successfully.",
  };
}

export async function rejectProductAction(
  productId: number,
  rejectionReason: string,
): Promise<AdminProductActionResult> {
  const response = await fetchServer(`/admin/products/${productId}/reject`, {
    method: "POST",
    body: JSON.stringify({ rejection_reason: rejectionReason }),
  });

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    return {
      success: false,
      message: body?.message ?? "Failed to reject product.",
    };
  }

  revalidatePath("/admin/products");
  return {
    success: true,
    message: body?.message ?? "Product rejected successfully.",
  };
}
