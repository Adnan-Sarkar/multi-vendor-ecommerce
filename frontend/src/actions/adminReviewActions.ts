"use server";

import { revalidatePath } from "next/cache";
import { fetchServer } from "@/lib/api-server";

export interface ApproveReviewResult {
  success: boolean;
  message: string;
}

export async function approveReviewAction(
  reviewId: number,
): Promise<ApproveReviewResult> {
  const response = await fetchServer(`/admin/review/${reviewId}/approve`, {
    method: "POST",
  });

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    return {
      success: false,
      message: body?.message ?? "Failed to approve review.",
    };
  }

  revalidatePath("/admin/reviews");
  return {
    success: true,
    message: body?.message ?? "Review approved successfully.",
  };
}
