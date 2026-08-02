import { fetchServer } from "@/lib/api-server";
import type {
  PaginationMeta,
  PaginatedResponse,
} from "@/services/vendorProductService";

export interface VendorReviewUser {
  id: number;
  name: string;
  email?: string;
}

export interface VendorReview {
  id: number;
  user?: VendorReviewUser | null;
  rating: number;
  title?: string | null;
  body?: string | null;
  is_approved: boolean;
  vendor_reply?: string | null;
  vendor_replied_at?: string | null;
  created_at?: string;
}

const emptyMeta: PaginationMeta = {
  current_page: 1,
  per_page: 10,
  total: 0,
  last_page: 1,
  from: null,
  to: null,
};

export async function getVendorProductReviews(
  productId: number,
  page = 1,
): Promise<PaginatedResponse<VendorReview>> {
  try {
    const response = await fetchServer(
      `/vendor/reviews/product/${productId}?page=${page}`,
      { cache: "no-store" },
    );

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
