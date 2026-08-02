"use server";

import { revalidatePath } from "next/cache";
import { fetchServer } from "@/lib/api-server";

export interface ReplyReviewResult {
  success: boolean;
  message: string;
}

export async function replyToReviewAction(
  reviewId: number,
  reply: string,
): Promise<ReplyReviewResult> {
  const response = await fetchServer(`/vendor/reviews/${reviewId}/reply`, {
    method: "PATCH",
    body: JSON.stringify({ reply }),
  });

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    return {
      success: false,
      message: body?.message ?? "Failed to send reply.",
    };
  }

  revalidatePath("/dashboard/reviews");
  return {
    success: true,
    message: body?.message ?? "Reply sent successfully.",
  };
}
