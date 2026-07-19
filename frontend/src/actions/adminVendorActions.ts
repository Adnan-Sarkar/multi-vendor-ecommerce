"use server";

import { revalidatePath } from "next/cache";
import { fetchServer } from "@/lib/api-server";

export interface ActionResult {
  success: boolean;
  message: string;
}

export async function approveVendorAction(vendorId: number): Promise<ActionResult> {
  const response = await fetchServer(`/admin/vendor/${vendorId}/approve`, { method: "POST" });
  const body = await response.json().catch(() => null);

  if (!response.ok) {
    return { success: false, message: body?.message ?? "Failed to approve vendor." };
  }

  revalidatePath("/admin/vendors");
  return { success: true, message: body?.message ?? "Vendor approved successfully." };
}

export async function rejectVendorAction(vendorId: number, reason: string): Promise<ActionResult> {
  const response = await fetchServer(`/admin/vendor/${vendorId}/reject`, {
    method: "POST",
    body: JSON.stringify({ rejection_reason: reason }),
  });
  const body = await response.json().catch(() => null);

  if (!response.ok) {
    return { success: false, message: body?.message ?? "Failed to reject vendor." };
  }

  revalidatePath("/admin/vendors");
  return { success: true, message: body?.message ?? "Vendor rejected successfully." };
}
