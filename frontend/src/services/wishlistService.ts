import { fetchServer } from "@/lib/api-server";
import type { PublicProduct } from "@/services/productService";
import type {
  PaginationMeta,
  PaginatedResponse,
} from "@/services/vendorProductService";

export interface WishlistItem {
  id: number;
  product: PublicProduct;
  created_at?: string;
}

const emptyMeta: PaginationMeta = {
  current_page: 1,
  per_page: 20,
  total: 0,
  last_page: 1,
  from: null,
  to: null,
};

export async function getWishlist(
  page = 1,
): Promise<PaginatedResponse<WishlistItem>> {
  try {
    const response = await fetchServer(`/wishlist?page=${page}`, {
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

export async function getWishlistProductIds(): Promise<number[]> {
  try {
    const response = await fetchServer("/wishlist/ids", { cache: "no-store" });

    if (!response.ok) {
      return [];
    }

    const body = await response.json();

    return body.data ?? [];
  } catch {
    return [];
  }
}
