import { fetchServer } from "@/lib/api-server";

export interface OrderStatusCount {
  status: string;
  count: number;
}

export interface MonthlyRevenue {
  month: string;
  label: string;
  total: number;
}

export interface MonthlyCount {
  month: string;
  label: string;
  count: number;
}

export interface TopVendor {
  shop_name: string;
  earning: number;
}

export interface PaymentMethodCount {
  method: string;
  count: number;
}

export interface TopProduct {
  name: string;
  units: number;
  revenue: number;
}

export interface ViewedProduct {
  name: string;
  views: number;
}

export interface TopCustomer {
  name: string;
  spent: number;
  orders: number;
}

export interface RatingCount {
  rating: number;
  count: number;
}

export interface RecentOrder {
  order_number: string;
  customer: string;
  grand_total: number;
  status: string;
  created_at: string;
}

export interface RecentReview {
  rating: number;
  user: string;
  product: string;
  created_at: string;
}

export interface RecentSignup {
  name: string;
  email: string;
  created_at: string;
}

export interface PeriodMetric {
  value: number;
  delta: number | null;
}

export interface PeriodMetrics {
  revenue: PeriodMetric;
  orders: PeriodMetric;
  new_customers: PeriodMetric;
  commission: PeriodMetric;
  average_order_value: PeriodMetric;
}

export type DashboardRange = "today" | "7d" | "30d" | "90d" | "all";

export interface AdminDashboardStats {
  range: DashboardRange;
  period: PeriodMetrics;

  total_users: number;
  total_vendors: number;
  total_products: number;
  total_orders: number;
  total_revenue: number;
  total_reviews: number;
  total_coupons: number;
  total_categories: number;

  platform_commission: number;
  average_order_value: number;
  total_discounts: number;
  total_shipping: number;
  total_paid_out: number;
  pending_payout_amount: number;
  vendor_payables: number;

  payment_method_split: PaymentMethodCount[];
  average_items_per_order: number;

  top_products: TopProduct[];
  most_viewed_products: ViewedProduct[];
  low_stock_count: number;
  out_of_stock_count: number;

  top_customers: TopCustomer[];
  repeat_customers: number;
  single_order_customers: number;

  average_rating: number;
  rating_distribution: RatingCount[];

  pending_vendor_approvals: number;
  pending_product_approvals: number;
  pending_reviews: number;
  pending_withdrawals: number;

  orders_by_status: OrderStatusCount[];
  revenue_last_6_months: MonthlyRevenue[];
  customers_last_6_months: MonthlyCount[];
  top_vendors: TopVendor[];

  recent_orders: RecentOrder[];
  recent_reviews: RecentReview[];
  recent_signups: RecentSignup[];
}

const emptyPeriodMetric: PeriodMetric = { value: 0, delta: null };

const emptyStats: AdminDashboardStats = {
  range: "30d",
  period: {
    revenue: emptyPeriodMetric,
    orders: emptyPeriodMetric,
    new_customers: emptyPeriodMetric,
    commission: emptyPeriodMetric,
    average_order_value: emptyPeriodMetric,
  },

  total_users: 0,
  total_vendors: 0,
  total_products: 0,
  total_orders: 0,
  total_revenue: 0,
  total_reviews: 0,
  total_coupons: 0,
  total_categories: 0,

  platform_commission: 0,
  average_order_value: 0,
  total_discounts: 0,
  total_shipping: 0,
  total_paid_out: 0,
  pending_payout_amount: 0,
  vendor_payables: 0,

  payment_method_split: [],
  average_items_per_order: 0,

  top_products: [],
  most_viewed_products: [],
  low_stock_count: 0,
  out_of_stock_count: 0,

  top_customers: [],
  repeat_customers: 0,
  single_order_customers: 0,

  average_rating: 0,
  rating_distribution: [],

  pending_vendor_approvals: 0,
  pending_product_approvals: 0,
  pending_reviews: 0,
  pending_withdrawals: 0,

  orders_by_status: [],
  revenue_last_6_months: [],
  customers_last_6_months: [],
  top_vendors: [],

  recent_orders: [],
  recent_reviews: [],
  recent_signups: [],
};

export async function getAdminDashboard(
  range = "30d",
): Promise<AdminDashboardStats> {
  try {
    const response = await fetchServer(`/admin/dashboard?range=${range}`, {
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
