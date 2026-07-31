"use server";

import { revalidatePath } from "next/cache";
import { fetchServer } from "@/lib/api-server";
import type { Order } from "@/services/customerOrderService";

export interface PlaceOrderInput {
  shipping_address_id: number;
  payment_method: string;
  coupon_code?: string | null;
  notes?: string;
}

export interface PlaceOrderResult {
  success: boolean;
  message: string;
  order?: Order;
  requiresAuth?: boolean;
}

export async function placeOrderAction(
  input: PlaceOrderInput,
): Promise<PlaceOrderResult> {
  const response = await fetchServer("/order", {
    method: "POST",
    body: JSON.stringify(input),
  });

  const body = await response.json().catch(() => null);

  if (response.status === 401) {
    return {
      success: false,
      requiresAuth: true,
      message: "Please log in to place an order.",
    };
  }

  if (!response.ok) {
    return {
      success: false,
      message: body?.message ?? "Failed to place order.",
    };
  }

  revalidatePath("/orders");

  return {
    success: true,
    message: body?.message ?? "Order placed successfully.",
    order: body?.data,
  };
}

export interface InitiatePaymentResult {
  success: boolean;
  message: string;
  paymentUrl?: string;
}

export async function initiatePaymentAction(
  orderId: number,
): Promise<InitiatePaymentResult> {
  const response = await fetchServer(`/payment/${orderId}/initiate`, {
    method: "POST",
  });

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    return {
      success: false,
      message: body?.message ?? "Payment initiation failed.",
    };
  }

  return {
    success: true,
    message: body?.message ?? "Payment initiated.",
    paymentUrl: body?.data?.payment_url,
  };
}

export interface CancelOrderResult {
  success: boolean;
  message: string;
}

export async function cancelOrderAction(
  orderId: number,
  reason: string,
): Promise<CancelOrderResult> {
  const response = await fetchServer(`/order/${orderId}/cancel`, {
    method: "PATCH",
    body: JSON.stringify({ cancellation_reason: reason }),
  });

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    return {
      success: false,
      message: body?.message ?? "Failed to cancel order.",
    };
  }

  revalidatePath("/orders");
  revalidatePath(`/orders/${orderId}`);

  return {
    success: true,
    message: body?.message ?? "Order cancelled successfully.",
  };
}
