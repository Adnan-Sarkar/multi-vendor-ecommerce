"use server";

import { revalidatePath } from "next/cache";
import { fetchServer } from "@/lib/api-server";

export interface CreateReviewInput {
  order_id: number;
  product_id: number;
  rating: number;
  title?: string;
  body?: string;
}

export interface CreateReviewResult {
  success: boolean;
  message: string;
  requiresAuth?: boolean;
}

export async function createReviewAction(
  input: CreateReviewInput,
): Promise<CreateReviewResult> {
  const response = await fetchServer("/review", {
    method: "POST",
    body: JSON.stringify(input),
  });

  const body = await response.json().catch(() => null);

  if (response.status === 401) {
    return {
      success: false,
      requiresAuth: true,
      message: "Please log in to write a review.",
    };
  }

  if (!response.ok) {
    return {
      success: false,
      message: body?.message ?? "Failed to submit review.",
    };
  }

  revalidatePath(`/orders/${input.order_id}`);

  return {
    success: true,
    message: body?.message ?? "Review submitted successfully.",
  };
}
