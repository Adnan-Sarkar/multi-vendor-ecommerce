import { fetchServer } from "@/lib/api-server";
import type {
  PaginationMeta,
  PaginatedResponse,
} from "@/services/vendorProductService";

export interface AdminProductVendor {
  id: number;
  shop_name: string;
  slug: string;
}

export interface AdminProductCategory {
  id: number;
  name: string;
  slug: string;
}

export interface AdminProductImage {
  id: number;
  image_url: string;
}

export interface AdminProduct {
  id: number;
  name: string;
  slug: string;
  sku: string;
  short_description: string;
  description: string | null;
  thumbnail: string | null;
  regular_price: string;
  sale_price: string | null;
  stock_qty: number | null;
  status: string;
  vendor?: AdminProductVendor | null;
  categories?: AdminProductCategory[];
  images?: AdminProductImage[];
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

export async function getAdminProducts(
  page = 1,
  status?: string,
): Promise<PaginatedResponse<AdminProduct>> {
  try {
    const params = new URLSearchParams();
    params.set("page", String(page));

    if (status) {
      params.set("status", status);
    }

    const response = await fetchServer(`/admin/products?${params.toString()}`, {
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
