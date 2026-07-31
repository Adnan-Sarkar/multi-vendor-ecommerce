import { fetchServer } from "@/lib/api-server";
import type { Order } from "@/services/customerOrderService";
import type {
  PaginationMeta,
  PaginatedResponse,
} from "@/services/vendorProductService";

const emptyMeta: PaginationMeta = {
  current_page: 1,
  per_page: 20,
  total: 0,
  last_page: 1,
  from: null,
  to: null,
};

export async function getAllOrders(
  page = 1,
): Promise<PaginatedResponse<Order>> {
  try {
    const response = await fetchServer(`/admin/orders?page=${page}`, {
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
