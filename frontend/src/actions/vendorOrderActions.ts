"use server";

import { revalidatePath } from "next/cache";
import { fetchServer } from "@/lib/api-server";

export interface VendorOrderActionResult {
  success: boolean;
  message: string;
}

export async function updateVendorOrderStatusAction(
  orderVendorId: number,
  status: string,
): Promise<VendorOrderActionResult> {
  const response = await fetchServer(`/vendor/orders/${orderVendorId}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    return {
      success: false,
      message: body?.message ?? "Failed to update order status.",
    };
  }

  revalidatePath("/dashboard/orders");

  return {
    success: true,
    message: body?.message ?? "Order status updated.",
  };
}

export async function updateTrackingNumberAction(
  orderVendorId: number,
  trackingNumber: string,
): Promise<VendorOrderActionResult> {
  const response = await fetchServer(
    `/vendor/orders/${orderVendorId}/tracking-number`,
    {
      method: "PATCH",
      body: JSON.stringify({ tracking_number: trackingNumber }),
    },
  );

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    return {
      success: false,
      message: body?.message ?? "Failed to update tracking number.",
    };
  }

  revalidatePath("/dashboard/orders");

  return {
    success: true,
    message: body?.message ?? "Tracking number updated.",
  };
}
