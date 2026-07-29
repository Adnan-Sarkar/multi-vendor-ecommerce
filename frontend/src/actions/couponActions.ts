"use server";

import { revalidatePath } from "next/cache";
import { fetchServer } from "@/lib/api-server";

export interface AppliedCoupon {
  code: string;
  discount: number;
  subtotal: number;
  finalTotal: number;
}

export interface ApplyCouponResult {
  success: boolean;
  message: string;
  coupon?: AppliedCoupon;
  requiresAuth?: boolean;
}

export async function applyCouponAction(
  code: string,
): Promise<ApplyCouponResult> {
  const response = await fetchServer("/coupon/apply", {
    method: "POST",
    body: JSON.stringify({ code }),
  });

  const body = await response.json().catch(() => null);

  if (response.status === 401) {
    return {
      success: false,
      requiresAuth: true,
      message: "Please log in to apply a coupon.",
    };
  }

  if (!response.ok) {
    return {
      success: false,
      message: body?.message ?? "Failed to apply coupon.",
    };
  }

  const data = body?.data;

  return {
    success: true,
    message: body?.message ?? "Coupon applied.",
    coupon: {
      code: data.coupon.code,
      discount: Number(data.discount),
      subtotal: Number(data.subtotal),
      finalTotal: Number(data.final_total),
    },
  };
}

export interface CouponFormState {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export interface DeleteCouponResult {
  success: boolean;
  message: string;
}

function readText(formData: FormData, field: string): string {
  return String(formData.get(field) ?? "").trim();
}

export async function createVendorCouponAction(
  _previousState: CouponFormState | null,
  formData: FormData,
): Promise<CouponFormState> {
  const payload: Record<string, unknown> = {
    code: readText(formData, "code"),
    type: readText(formData, "type"),
    value: readText(formData, "value"),
    is_active: formData.get("is_active") === "on",
  };

  const minOrderAmount = readText(formData, "min_order_amount");
  if (minOrderAmount) {
    payload.min_order_amount = minOrderAmount;
  }

  const maxDiscountAmount = readText(formData, "max_discount_amount");
  if (maxDiscountAmount) {
    payload.max_discount_amount = maxDiscountAmount;
  }

  const maxUses = readText(formData, "max_uses");
  if (maxUses) {
    payload.max_uses = Number(maxUses);
  }

  const maxUsesPerUser = readText(formData, "max_uses_per_user");
  if (maxUsesPerUser) {
    payload.max_uses_per_user = Number(maxUsesPerUser);
  }

  const startsAt = readText(formData, "starts_at");
  if (startsAt) {
    payload.starts_at = startsAt;
  }

  const expiresAt = readText(formData, "expires_at");
  if (expiresAt) {
    payload.expires_at = expiresAt;
  }

  const response = await fetchServer("/vendor/coupon", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    return {
      success: false,
      message: body?.message ?? "Failed to create coupon.",
      errors: body?.errors,
    };
  }

  revalidatePath("/dashboard/coupons");
  return {
    success: true,
    message: body?.message ?? "Coupon created successfully.",
  };
}

export async function deleteVendorCouponAction(
  couponId: number,
): Promise<DeleteCouponResult> {
  const response = await fetchServer(`/vendor/coupon/${couponId}`, {
    method: "DELETE",
  });

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    return {
      success: false,
      message: body?.message ?? "Failed to delete coupon.",
    };
  }

  revalidatePath("/dashboard/coupons");
  return {
    success: true,
    message: body?.message ?? "Coupon deleted successfully.",
  };
}

export async function deleteAdminCouponAction(
  couponId: number,
): Promise<DeleteCouponResult> {
  const response = await fetchServer(`/admin/coupon/${couponId}`, {
    method: "DELETE",
  });

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    return {
      success: false,
      message: body?.message ?? "Failed to delete coupon.",
    };
  }

  revalidatePath("/admin/coupons");
  return {
    success: true,
    message: body?.message ?? "Coupon deleted successfully.",
  };
}
