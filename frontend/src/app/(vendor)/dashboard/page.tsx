import {
  CurrencyDollarIcon,
  WalletIcon,
  ClipboardTextIcon,
  HourglassIcon,
  PackageIcon,
} from "@phosphor-icons/react/dist/ssr";
import { formatMoney } from "@/lib/productPricing";
import { getVendorDashboard } from "@/services/vendorDashboardService";
import { getVendorOrders } from "@/services/vendorOrderService";
import { StatCard } from "./components/StatCard";
import { RecentVendorOrders } from "./components/RecentVendorOrders";

const RECENT_ORDERS_LIMIT = 5;

export default async function VendorDashboardPage() {
  const [stats, ordersResult] = await Promise.all([
    getVendorDashboard(),
    getVendorOrders(1),
  ]);

  const recentOrders = ordersResult.data.slice(0, RECENT_ORDERS_LIMIT);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          An overview of your store performance and earnings.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <StatCard
          title="Total Revenue"
          value={formatMoney(stats.total_revenue)}
          subtitle="Lifetime earnings"
          tone="green"
          icon={<CurrencyDollarIcon size={22} />}
        />
        <StatCard
          title="Available Balance"
          value={formatMoney(stats.balance)}
          subtitle="Ready to withdraw"
          tone="indigo"
          icon={<WalletIcon size={22} />}
        />
        <StatCard
          title="Total Orders"
          value={String(stats.total_orders)}
          subtitle="All-time orders"
          tone="purple"
          icon={<ClipboardTextIcon size={22} />}
        />
        <StatCard
          title="Pending Orders"
          value={String(stats.pending_orders)}
          subtitle="Awaiting fulfillment"
          tone="amber"
          icon={<HourglassIcon size={22} />}
        />
        <StatCard
          title="Total Products"
          value={String(stats.total_products)}
          subtitle="Active listings"
          tone="blue"
          icon={<PackageIcon size={22} />}
        />
      </div>

      <RecentVendorOrders orders={recentOrders} />
    </div>
  );
}
