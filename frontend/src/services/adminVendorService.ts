import { fetchServer } from "@/lib/api-server";

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  avatar: string | null;
  is_active: boolean;
  email_verified_at: string | null;
  created_at: string;
}

export interface PendingVendor {
  id: number;
  shop_name: string;
  slug: string;
  description?: string | null;
  logo?: string | null;
  banner?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zip_code?: string | null;
  status?: string;
  user?: AdminUser;
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

export async function getPendingVendors(
  page = 1,
): Promise<PaginatedResponse<PendingVendor>> {
  try {
    const response = await fetchServer(`/admin/vendor/pending?page=${page}`, {
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
