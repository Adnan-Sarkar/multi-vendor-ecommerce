import { fetchServer } from "@/lib/api-server";

export type ProductStatus = "pending" | "approved" | "rejected";

export interface ProductImage {
  id: number;
  image_url: string;
  is_primary: boolean;
  sort_order: number;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
}

export interface ProductTag {
  id: number;
  name: string;
  slug: string;
}

export interface VendorProduct {
  id: number;
  name: string;
  slug: string;
  sku: string;
  short_description: string;
  description: string | null;
  thumbnail: string | null;
  regular_price: string;
  sale_price: string | null;
  sale_start_date: string | null;
  sale_end_date: string | null;
  stock_qty: number | null;
  low_stock_threshold: number | null;
  manage_stock: boolean;
  in_stock: boolean;
  weight: string | null;
  length: string | null;
  width: string | null;
  height: string | null;
  status: ProductStatus;
  is_featured: boolean;
  views: number;
  rejection_reason?: string;
  categories?: ProductCategory[];
  tags?: ProductTag[];
  images?: ProductImage[];
  created_at: string;
  updated_at: string;
  approved_at?: string;
}

export interface PaginationMeta {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  from: number | null;
  to: number | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

const emptyMeta: PaginationMeta = {
  current_page: 1,
  per_page: 20,
  total: 0,
  last_page: 1,
  from: null,
  to: null,
};

export async function getMyProducts(page = 1): Promise<PaginatedResponse<VendorProduct>> {
  try {
    const response = await fetchServer(`/product/me/products?page=${page}`, {
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

export async function getMyProduct(productId: number): Promise<VendorProduct | null> {
  try {
    const response = await fetchServer(`/product/me/products/${productId}`, {
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
