import { fetchServer } from "@/lib/api-server";
import type { PublicProduct } from "@/services/productService";
import type { PaginationMeta } from "@/services/vendorProductService";

export interface VendorStats {
  products_count: number;
  average_rating: number;
  review_count: number;
  total_orders: number;
  completed_orders: number;
  completion_rate: number;
}

export interface PublicVendor {
  id: number;
  shop_name: string;
  slug: string;
  description?: string | null;
  logo?: string | null;
  banner?: string | null;
  city?: string | null;
  state?: string | null;
  member_since: string;
  products_count?: number;
  review_count?: number;
  average_rating?: number;
  stats?: VendorStats;
}

export interface VendorListFilters {
  search?: string;
  sort?: string;
  page?: number;
}

export interface VendorProductFilters {
  sort?: string;
  page?: number;
}

const emptyMeta: PaginationMeta = {
  current_page: 1,
  per_page: 20,
  total: 0,
  last_page: 1,
  from: null,
  to: null,
};

export interface PaginatedVendors {
  data: PublicVendor[];
  meta: PaginationMeta;
}

export interface PaginatedVendorProducts {
  data: PublicProduct[];
  meta: PaginationMeta;
}

export async function getVendors(
  filters: VendorListFilters = {},
): Promise<PaginatedVendors> {
  const query = new URLSearchParams();

  if (filters.search) query.set("search", filters.search);
  if (filters.sort) query.set("sort", filters.sort);
  if (filters.page) query.set("page", String(filters.page));

  try {
    const response = await fetchServer(`/vendors?${query.toString()}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return { data: [], meta: emptyMeta };
    }

    const body = await response.json();

    return { data: body.data ?? [], meta: body.meta ?? emptyMeta };
  } catch {
    return { data: [], meta: emptyMeta };
  }
}

export async function getVendor(slug: string): Promise<PublicVendor | null> {
  try {
    const response = await fetchServer(`/vendors/${slug}`, {
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

export async function getVendorProducts(
  slug: string,
  filters: VendorProductFilters = {},
): Promise<PaginatedVendorProducts> {
  const query = new URLSearchParams();

  if (filters.sort) query.set("sort", filters.sort);
  if (filters.page) query.set("page", String(filters.page));

  try {
    const response = await fetchServer(
      `/vendors/${slug}/products?${query.toString()}`,
      { cache: "no-store" },
    );

    if (!response.ok) {
      return { data: [], meta: emptyMeta };
    }

    const body = await response.json();
    return { data: body.data ?? [], meta: body.meta ?? emptyMeta };
  } catch {
    return { data: [], meta: emptyMeta };
  }
}
