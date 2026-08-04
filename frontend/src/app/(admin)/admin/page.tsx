import {
  CurrencyDollarIcon,
  HandCoinsIcon,
  UserPlusIcon,
  ClipboardTextIcon,
  PercentIcon,
  WalletIcon,
  HourglassIcon,
  CoinsIcon,
  UsersIcon,
  StorefrontIcon,
  PackageIcon,
  StarIcon,
  TicketIcon,
  SquaresFourIcon,
  StackIcon,
  ArrowsClockwiseIcon,
  UserIcon,
  WarningIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react/dist/ssr";
import { formatMoney } from "@/lib/productPricing";
import {
  getAdminDashboard,
  type DashboardRange,
} from "@/services/adminDashboardService";
import { StatCard } from "@/components/shared/StatCard";
import { DashboardRangeSelector } from "./components/DashboardRangeSelector";
import { MiniStat } from "./components/MiniStat";
import { ChartCard } from "./components/ChartCard";
import { RankedList } from "./components/RankedList";
import { RatingBars } from "./components/RatingBars";
import { RecentActivity } from "./components/RecentActivity";
import { RevenueAreaChart } from "./components/charts/RevenueAreaChart";
import { NewCustomersChart } from "./components/charts/NewCustomersChart";
import { DonutChart } from "./components/charts/DonutChart";

const ORDER_STATUS_COLORS: Record<string, string> = {
  pending: "#f59e0b",
  confirmed: "#6366f1",
  processing: "#3b82f6",
  shipped: "#0ea5e9",
  delivered: "#22c55e",
  cancelled: "#ef4444",
};

const PAYMENT_META: Record<string, { label: string; color: string }> = {
  sslcommerz: { label: "SSLCommerz", color: "#6366f1" },
  cod: { label: "Cash on delivery", color: "#22c55e" },
  bkash: { label: "bKash", color: "#ec4899" },
  card: { label: "Card", color: "#3b82f6" },
  unknown: { label: "Other", color: "#94a3b8" },
};

const RANGE_OPTIONS: DashboardRange[] = ["today", "7d", "30d", "90d", "all"];

const RANGE_LABELS: Record<DashboardRange, string> = {
  today: "Today",
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  "90d": "Last 90 days",
  all: "All time",
};

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

interface AdminDashboardPageProps {
  searchParams: Promise<{ range?: string }>;
}

export default async function AdminDashboardPage({
  searchParams,
}: AdminDashboardPageProps) {
  const { range } = await searchParams;
  const activeRange: DashboardRange = RANGE_OPTIONS.includes(
    range as DashboardRange,
  )
    ? (range as DashboardRange)
    : "30d";

  const stats = await getAdminDashboard(activeRange);
  const periodLabel = RANGE_LABELS[activeRange];

  const orderStatusSlices = stats.orders_by_status.map((entry) => ({
    label: capitalize(entry.status),
    value: entry.count,
    color: ORDER_STATUS_COLORS[entry.status] ?? "#94a3b8",
  }));
  const totalOrderCount = stats.orders_by_status.reduce(
    (sum, entry) => sum + entry.count,
    0,
  );

  const paymentSlices = stats.payment_method_split.map((entry) => {
    const meta = PAYMENT_META[entry.method] ?? {
      label: capitalize(entry.method),
      color: "#94a3b8",
    };

    return { label: meta.label, value: entry.count, color: meta.color };
  });
  const totalPaymentCount = stats.payment_method_split.reduce(
    (sum, entry) => sum + entry.count,
    0,
  );

  const topProductItems = stats.top_products.map((product) => ({
    label: product.name,
    value: product.revenue,
    valueLabel: formatMoney(product.revenue),
    meta: `${product.units} sold`,
  }));

  const topVendorItems = stats.top_vendors.map((vendor) => ({
    label: vendor.shop_name,
    value: vendor.earning,
    valueLabel: formatMoney(vendor.earning),
  }));

  const topCustomerItems = stats.top_customers.map((customer) => ({
    label: customer.name,
    value: customer.spent,
    valueLabel: formatMoney(customer.spent),
    meta: `${customer.orders} ${customer.orders === 1 ? "order" : "orders"}`,
  }));

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Overview
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Monitor the whole marketplace from a single place.
          </p>
        </div>

        <DashboardRangeSelector activeRange={activeRange} />
      </div>

      {/* Headline KPIs (scoped to selected range) */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Revenue"
          value={formatMoney(stats.period.revenue.value)}
          delta={stats.period.revenue.delta}
          subtitle={periodLabel}
          tone="green"
          icon={<CurrencyDollarIcon size={22} />}
        />
        <StatCard
          title="Platform Commission"
          value={formatMoney(stats.period.commission.value)}
          delta={stats.period.commission.delta}
          subtitle={periodLabel}
          tone="indigo"
          icon={<HandCoinsIcon size={22} />}
        />
        <StatCard
          title="Orders"
          value={String(stats.period.orders.value)}
          delta={stats.period.orders.delta}
          subtitle={periodLabel}
          tone="blue"
          icon={<ClipboardTextIcon size={22} />}
        />
        <StatCard
          title="New Customers"
          value={String(stats.period.new_customers.value)}
          delta={stats.period.new_customers.delta}
          subtitle={periodLabel}
          tone="purple"
          icon={<UserPlusIcon size={22} />}
        />
      </div>

      {/* Secondary financials */}
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        <MiniStat
          label="Discounts given"
          value={formatMoney(stats.total_discounts)}
          icon={<PercentIcon size={20} />}
        />
        <MiniStat
          label="Total paid out"
          value={formatMoney(stats.total_paid_out)}
          icon={<WalletIcon size={20} />}
        />
        <MiniStat
          label="Pending payout"
          value={formatMoney(stats.pending_payout_amount)}
          icon={<HourglassIcon size={20} />}
        />
        <MiniStat
          label="Vendor payables"
          value={formatMoney(stats.vendor_payables)}
          icon={<CoinsIcon size={20} />}
        />
      </div>

      {/* Marketplace counts */}
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
        <MiniStat
          label="Customers"
          value={String(stats.total_users)}
          icon={<UsersIcon size={20} />}
        />
        <MiniStat
          label="Vendors"
          value={String(stats.total_vendors)}
          icon={<StorefrontIcon size={20} />}
        />
        <MiniStat
          label="Products"
          value={String(stats.total_products)}
          icon={<PackageIcon size={20} />}
        />
        <MiniStat
          label="Reviews"
          value={String(stats.total_reviews)}
          icon={<StarIcon size={20} />}
        />
        <MiniStat
          label="Coupons"
          value={String(stats.total_coupons)}
          icon={<TicketIcon size={20} />}
        />
        <MiniStat
          label="Categories"
          value={String(stats.total_categories)}
          icon={<SquaresFourIcon size={20} />}
        />
      </div>

      {/* Trends */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <ChartCard
          title="Revenue"
          subtitle="Paid orders, last 6 months"
          className="lg:col-span-2"
        >
          <RevenueAreaChart data={stats.revenue_last_6_months} />
        </ChartCard>

        <ChartCard title="Orders by status" subtitle="All-time distribution">
          <DonutChart
            data={orderStatusSlices}
            centerValue={String(totalOrderCount)}
            centerLabel="Total orders"
          />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <ChartCard
          title="New customers"
          subtitle="Sign-ups, last 6 months"
          className="lg:col-span-2"
        >
          <NewCustomersChart data={stats.customers_last_6_months} />
        </ChartCard>

        <ChartCard title="Payment methods" subtitle="Orders by method">
          <DonutChart
            data={paymentSlices}
            centerValue={String(totalPaymentCount)}
            centerLabel="Total orders"
          />
        </ChartCard>
      </div>

      {/* Rankings */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ChartCard title="Top products" subtitle="By revenue">
          <RankedList
            items={topProductItems}
            emptyMessage="No product sales yet."
          />
        </ChartCard>

        <ChartCard title="Top vendors" subtitle="By total earnings">
          <RankedList
            items={topVendorItems}
            emptyMessage="No vendor earnings yet."
          />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ChartCard title="Top customers" subtitle="By total spend">
          <RankedList
            items={topCustomerItems}
            emptyMessage="No customer spend yet."
          />
        </ChartCard>

        <ChartCard title="Rating distribution" subtitle="Approved reviews">
          <RatingBars
            data={stats.rating_distribution}
            average={stats.average_rating}
          />
        </ChartCard>
      </div>

      {/* Health metrics */}
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        <MiniStat
          label="Avg items / order"
          value={String(stats.average_items_per_order)}
          icon={<StackIcon size={20} />}
        />
        <MiniStat
          label="Repeat customers"
          value={String(stats.repeat_customers)}
          icon={<ArrowsClockwiseIcon size={20} />}
        />
        <MiniStat
          label="One-time customers"
          value={String(stats.single_order_customers)}
          icon={<UserIcon size={20} />}
        />
        <MiniStat
          label="Avg rating"
          value={stats.average_rating.toFixed(1)}
          icon={<StarIcon size={20} />}
        />
      </div>

      {/* Needs attention */}
      <div>
        <h2 className="mb-4 text-lg font-bold text-gray-900">Needs attention</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Vendor Approvals"
            value={String(stats.pending_vendor_approvals)}
            subtitle="Review applications"
            tone="amber"
            icon={<StorefrontIcon size={22} />}
            href="/admin/vendors"
          />
          <StatCard
            title="Product Approvals"
            value={String(stats.pending_product_approvals)}
            subtitle="Review submissions"
            tone="amber"
            icon={<PackageIcon size={22} />}
            href="/admin/products"
          />
          <StatCard
            title="Pending Reviews"
            value={String(stats.pending_reviews)}
            subtitle="Moderate reviews"
            tone="amber"
            icon={<StarIcon size={22} />}
            href="/admin/reviews"
          />
          <StatCard
            title="Pending Withdrawals"
            value={String(stats.pending_withdrawals)}
            subtitle="Approve payouts"
            tone="amber"
            icon={<WalletIcon size={22} />}
            href="/admin/withdrawals"
          />
          <StatCard
            title="Low Stock"
            value={String(stats.low_stock_count)}
            subtitle="Products running low"
            tone="amber"
            icon={<WarningIcon size={22} />}
            href="/admin/products"
          />
          <StatCard
            title="Out of Stock"
            value={String(stats.out_of_stock_count)}
            subtitle="Products unavailable"
            tone="amber"
            icon={<WarningCircleIcon size={22} />}
            href="/admin/products"
          />
        </div>
      </div>

      {/* Recent activity */}
      <RecentActivity
        orders={stats.recent_orders}
        reviews={stats.recent_reviews}
        signups={stats.recent_signups}
      />
    </div>
  );
}
