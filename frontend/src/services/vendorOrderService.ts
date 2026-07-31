import { fetchServer } from "@/lib/api-server";
import type { Address } from "@/services/addressService";
import type { OrderItem } from "@/services/customerOrderService";
import type {
  PaginationMeta,
  PaginatedResponse,
} from "@/services/vendorProductService";

export interface VendorOrderInfo {
  id: number;
  order_number: string;
  status: string;
  payment_method: string;
  payment_status: string;
  shipping_address?: Address | null;
  created_at?: string;
}

export interface VendorOrder {
  id: number;
  order?: VendorOrderInfo | null;
  order_items?: OrderItem[];
  subtotal: string;
  shipping_cost: string;
  commission: string;
  vendor_earning: string;
  status: string;
  tracking_number?: string | null;
  shipped_at?: string | null;
  delivered_at?: string | null;
}

const emptyMeta: PaginationMeta = {
  current_page: 1,
  per_page: 20,
  total: 0,
  last_page: 1,
  from: null,
  to: null,
};

export async function getVendorOrders(
  page = 1,
): Promise<PaginatedResponse<VendorOrder>> {
  try {
    const response = await fetchServer(`/vendor/orders?page=${page}`, {
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
