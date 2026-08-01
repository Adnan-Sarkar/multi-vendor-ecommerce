import { fetchServer } from "@/lib/api-server";
import type {
  PaginationMeta,
  PaginatedResponse,
} from "@/services/vendorProductService";

export interface AdminReviewProduct {
  id: number;
  name: string;
  slug: string;
  thumbnail: string | null;
}

export interface AdminReviewUser {
  id: number;
  name: string;
  email: string;
}

export interface AdminReview {
  id: number;
  product?: AdminReviewProduct | null;
  user?: AdminReviewUser | null;
  rating: number;
  title?: string | null;
  body?: string | null;
  is_approved: boolean;
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

export async function getAdminReviews(
  page = 1,
  status?: string,
): Promise<PaginatedResponse<AdminReview>> {
  try {
    const params = new URLSearchParams();
    params.set("page", String(page));

    if (status) {
      params.set("status", status);
    }

    const response = await fetchServer(`/admin/review?${params.toString()}`, {
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
