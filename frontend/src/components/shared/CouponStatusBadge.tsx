import { getCouponStatus, type CouponTone } from "@/lib/coupon";
import type { Coupon } from "@/services/couponService";

const TONES: Record<CouponTone, string> = {
  green: "bg-green-50 text-green-700 ring-green-600/20",
  gray: "bg-gray-100 text-gray-600 ring-gray-500/20",
  red: "bg-red-50 text-red-700 ring-red-600/20",
};

export function CouponStatusBadge({ coupon }: { coupon: Coupon }) {
  const status = getCouponStatus(coupon);

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${TONES[status.tone]}`}
    >
      {status.label}
    </span>
  );
}
