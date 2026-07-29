import type { Coupon } from "@/services/couponService";
import { formatMoney } from "@/lib/productPricing";

export type CouponTone = "green" | "gray" | "red";

export interface CouponStatus {
  label: string;
  tone: CouponTone;
}

export function formatCouponValue(coupon: Coupon): string {
  if (coupon.type === "percentage") {
    return `${Number(coupon.value)}%`;
  }

  return formatMoney(coupon.value);
}

export function formatCouponDate(value?: string | null): string {
  if (!value) {
    return "—";
  }

  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getCouponStatus(coupon: Coupon): CouponStatus {
  if (!coupon.is_active) {
    return { label: "Inactive", tone: "gray" };
  }

  const now = new Date();

  if (coupon.expires_at && new Date(coupon.expires_at) < now) {
    return { label: "Expired", tone: "red" };
  }

  if (coupon.starts_at && new Date(coupon.starts_at) > now) {
    return { label: "Scheduled", tone: "gray" };
  }

  if (coupon.max_uses && coupon.used_count >= coupon.max_uses) {
    return { label: "Used up", tone: "red" };
  }

  return { label: "Active", tone: "green" };
}
