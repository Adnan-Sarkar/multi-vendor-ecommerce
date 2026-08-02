import { fetchServer } from "@/lib/api-server";
import type {
  PaginationMeta,
  PaginatedResponse,
} from "@/services/vendorProductService";

export type WithdrawalStatus = "pending" | "approved" | "rejected";
export type WithdrawalMethod = "bank" | "bkash";

export interface WithdrawalAccountDetails {
  account_number?: string;
  account_name?: string;
  bank_name?: string;
  branch_name?: string;
  routing_number?: string;
}

export interface WithdrawalVendor {
  id: number;
  shop_name: string;
  slug: string;
}

export interface Withdrawal {
  id: number;
  amount: string;
  method: WithdrawalMethod;
  account_details: WithdrawalAccountDetails;
  status: WithdrawalStatus;
  admin_note?: string | null;
  processed_at?: string | null;
  vendor?: WithdrawalVendor | null;
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

export async function getVendorWithdrawals(
  page = 1,
): Promise<PaginatedResponse<Withdrawal>> {
  try {
    const response = await fetchServer(`/vendor/withdrawals?page=${page}`, {
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

export async function getPendingWithdrawals(
  page = 1,
  status = "",
): Promise<PaginatedResponse<Withdrawal>> {
  try {
    const query = new URLSearchParams({ page: String(page) });

    if (status) {
      query.set("status", status);
    }

    const response = await fetchServer(`/admin/withdrawals?${query.toString()}`, {
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

export async function getVendorBalance(): Promise<number> {
  try {
    const response = await fetchServer("/vendor/dashboard", {
      cache: "no-store",
    });

    if (!response.ok) {
      return 0;
    }

    const body = await response.json();

    return Number(body.data?.balance ?? 0);
  } catch {
    return 0;
  }
}
