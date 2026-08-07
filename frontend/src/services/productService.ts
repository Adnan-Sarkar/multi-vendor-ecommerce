import { fetchServer } from "@/lib/api-server";
import type { PaginationMeta } from "@/services/vendorProductService";

export interface PublicProductImage {
  id: number;
  image_url: string;
  is_primary: boolean;
  sort_order: number;
}

export interface PublicProductCategory {
  id: number;
  name: string;
  slug: string;
}

export interface PublicProductTag {
  id: number;
  name: string;
  slug: string;
}

export interface PublicProductVendor {
  id: number;
  shop_name: string;
  slug: string;
  status?: string;
}

export interface PublicProduct {
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
  low_stock_threshold: number | null;
  manage_stock?: boolean;
  in_stock: boolean;
  is_featured: boolean;
  views: number;
  reviews_count?: number;
  categories?: PublicProductCategory[];
  tags?: PublicProductTag[];
  images?: PublicProductImage[];
  vendor?: PublicProductVendor | null;
  created_at?: string;
}

export interface ProductVariantAttributeValue {
  id: number;
  value: string;
}

export interface ProductVariant {
  id: number;
  sku: string;
  price: string;
  stock_qty: number;
  in_stock: boolean;
  image: string | null;
  attribute_values?: ProductVariantAttributeValue[];
}

export interface ProductReviewUser {
  id: number;
  name: string;
  avatar?: string | null;
}

export interface ProductReview {
  id: number;
  rating: number;
  title: string | null;
  body: string | null;
  user?: ProductReviewUser | null;
  vendor_reply?: string | null;
  vendor_replied_at?: string | null;
  created_at?: string;
}

export interface ProductListFilters {
  search?: string;
  categories?: string[];
  min_price?: string;
  max_price?: string;
  in_stock?: boolean;
  on_sale?: boolean;
  sort?: string;
  page?: number;
}

export interface PaginatedProducts {
  data: PublicProduct[];
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

function buildListQuery(filters: ProductListFilters): string {
  const params = new URLSearchParams();

  if (filters.search) {
    params.set("search", filters.search);
  }

  for (const categorySlug of filters.categories ?? []) {
    params.append("categories[]", categorySlug);
  }

  if (filters.min_price) {
    params.set("min_price", filters.min_price);
  }

  if (filters.max_price) {
    params.set("max_price", filters.max_price);
  }

  if (filters.in_stock) {
    params.set("in_stock", "1");
  }

  if (filters.on_sale) {
    params.set("on_sale", "1");
  }

  if (filters.sort) {
    params.set("sort", filters.sort);
  }

  params.set("page", String(filters.page ?? 1));

  return params.toString();
}

export async function getAllProducts(
  filters: ProductListFilters = {},
): Promise<PaginatedProducts> {
  try {
    const query = buildListQuery(filters);
    const response = await fetchServer(`/product?${query}`, {
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

export async function getFeaturedProducts(): Promise<PublicProduct[]> {
  try {
    const response = await fetchServer("/product?featured=1", {
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    const body = await response.json();
    return body.data ?? [];
  } catch {
    return [];
  }
}

export async function getNewArrivals(limit = 8): Promise<PublicProduct[]> {
  const result = await getAllProducts({ sort: "newest" });
  return result.data.slice(0, limit);
}

export async function getPopularProducts(limit = 8): Promise<PublicProduct[]> {
  const result = await getAllProducts({ sort: "popular" });
  return result.data.slice(0, limit);
}

export async function getOnSaleProducts(limit = 8): Promise<PublicProduct[]> {
  const result = await getAllProducts({ on_sale: true });
  return result.data.slice(0, limit);
}

export async function getProductBySlug(
  slug: string,
): Promise<PublicProduct | null> {
  try {
    const response = await fetchServer(`/product/${slug}`, {
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

export async function getProductVariants(slug: string): Promise<ProductVariant[]> {
  try {
    const response = await fetchServer(`/product/${slug}/variants`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    const body = await response.json();
    return body.data ?? [];
  } catch {
    return [];
  }
}

export async function getProductReviews(slug: string): Promise<ProductReview[]> {
  try {
    const response = await fetchServer(`/product/${slug}/reviews`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    const body = await response.json();
    return body.data ?? [];
  } catch {
    return [];
  }
}
