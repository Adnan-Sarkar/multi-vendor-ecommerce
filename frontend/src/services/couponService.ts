import { fetchServer } from "@/lib/api-server";
import type {
  PaginationMeta,
  PaginatedResponse,
} from "@/services/vendorProductService";

export interface CouponVendor {
  id: number;
  shop_name: string;
  slug: string;
  status: string;
}

export interface Coupon {
  id: number;
  code: string;
  type: "flat" | "percentage";
  value: string;
  min_order_amount: string | null;
  max_discount_amount?: string | null;
  max_uses?: number | null;
  used_count: number;
  max_uses_per_user: number;
  is_active: boolean;
  starts_at?: string | null;
  expires_at?: string | null;
  created_at?: string;
  vendor?: CouponVendor | null;
}

const emptyMeta: PaginationMeta = {
  current_page: 1,
  per_page: 20,
  total: 0,
  last_page: 1,
  from: null,
  to: null,
};

export async function getVendorCoupons(
  page = 1,
): Promise<PaginatedResponse<Coupon>> {
  try {
    const response = await fetchServer(`/vendor/coupon?page=${page}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return { data: [], meta: emptyMeta };
    }

    const body = await response.json();

    return {
      data: body.data ?? [],
      meta: body.meta ?? emptyMeta,
    };
  } catch {
    return { data: [], meta: emptyMeta };
  }
}

export async function getAdminCoupons(
  page = 1,
): Promise<PaginatedResponse<Coupon>> {
  try {
    const response = await fetchServer(`/admin/coupon?page=${page}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return { data: [], meta: emptyMeta };
    }

    const body = await response.json();

    return {
      data: body.data ?? [],
      meta: body.meta ?? emptyMeta,
    };
  } catch {
    return { data: [], meta: emptyMeta };
  }
}
