import { fetchServer } from "@/lib/api-server";

export interface VendorDashboardStats {
  total_products: number;
  total_orders: number;
  pending_orders: number;
  total_revenue: string;
  balance: string;
}

const emptyStats: VendorDashboardStats = {
  total_products: 0,
  total_orders: 0,
  pending_orders: 0,
  total_revenue: "0",
  balance: "0",
};

export async function getVendorDashboard(): Promise<VendorDashboardStats> {
  try {
    const response = await fetchServer("/vendor/dashboard", {
      cache: "no-store",
    });

    if (!response.ok) {
      return emptyStats;
    }

    const body = await response.json();

    return { ...emptyStats, ...(body.data ?? {}) };
  } catch {
    return emptyStats;
  }
}
