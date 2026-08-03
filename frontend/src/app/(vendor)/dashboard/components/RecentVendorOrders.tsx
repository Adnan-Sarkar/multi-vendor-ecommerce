import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { formatMoney } from "@/lib/productPricing";
import { OrderStatusBadge } from "@/components/shared/OrderStatusBadge";
import type { VendorOrder } from "@/services/vendorOrderService";

interface RecentVendorOrdersProps {
  orders: VendorOrder[];
}

function formatDate(value?: string | null): string {
  if (!value) {
    return "—";
  }

  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function RecentVendorOrders({ orders }: RecentVendorOrdersProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-4 border-b border-gray-200 px-6 py-5">
        <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
        <Link
          href="/dashboard/orders"
          className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-700"
        >
          View all
          <ArrowRightIcon size={15} weight="bold" />
        </Link>
      </div>

      {orders.length === 0 ? (
        <p className="px-6 py-12 text-center text-sm text-gray-400">
          No orders yet. Orders from customers will appear here.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 font-medium text-gray-500">
              <tr>
                <th className="px-6 py-3.5">Order</th>
                <th className="px-6 py-3.5">Items</th>
                <th className="px-6 py-3.5">Earning</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((vendorOrder) => (
                <tr
                  key={vendorOrder.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {vendorOrder.order?.order_number ?? `#${vendorOrder.id}`}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {vendorOrder.order_items?.length ?? 0}
                  </td>
                  <td className="px-6 py-4 font-medium tabular-nums text-gray-900">
                    {formatMoney(vendorOrder.vendor_earning)}
                  </td>
                  <td className="px-6 py-4">
                    <OrderStatusBadge status={vendorOrder.status} />
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {formatDate(vendorOrder.order?.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
