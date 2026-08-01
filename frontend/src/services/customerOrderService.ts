import { fetchServer } from "@/lib/api-server";
import type { Address } from "@/services/addressService";
import type {
  PaginationMeta,
  PaginatedResponse,
} from "@/services/vendorProductService";

export interface OrderItem {
  id: number;
  product_id?: number;
  product_name: string;
  product_sku: string;
  variant_details?: string | null;
  quantity: number;
  unit_price: string;
  total: string;
  fulfillment_status?: string | null;
}

export interface OrderVendorGroup {
  id: number;
  vendor?: { id: number; shop_name: string; slug: string } | null;
  order_items?: OrderItem[];
  subtotal: string;
  vendor_earning: string;
  status: string;
  tracking_number?: string | null;
  shipped_at?: string | null;
  delivered_at?: string | null;
}

export interface OrderCustomer {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
}

export interface Order {
  id: number;
  order_number: string;
  status: string;
  payment_method: string;
  payment_status: string;
  customer?: OrderCustomer | null;
  subtotal: string;
  shipping_cost: string;
  coupon_discount: string;
  grand_total: string;
  shipping_address?: Address | null;
  billing_address?: Address | null;
  order_vendors?: OrderVendorGroup[];
  order_items?: OrderItem[];
  notes?: string | null;
  cancelled_at?: string | null;
  cancellation_reason?: string | null;
  created_at?: string;
  updated_at?: string;
}

const emptyMeta: PaginationMeta = {
  current_page: 1,
  per_page: 15,
  total: 0,
  last_page: 1,
  from: null,
  to: null,
};

export async function getOrders(page = 1): Promise<PaginatedResponse<Order>> {
  try {
    const response = await fetchServer(`/order?page=${page}`, {
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

export async function getOrder(orderId: number): Promise<Order | null> {
  try {
    const response = await fetchServer(`/order/${orderId}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const body = await response.json();

    return body.data ?? null;
  } catch {
    return null;
  }
}
