import Link from "next/link";
import { CaretRightIcon } from "@phosphor-icons/react/dist/ssr";
import { formatMoney } from "@/lib/productPricing";
import { OrderStatusBadge } from "@/components/shared/OrderStatusBadge";
import type { Order } from "@/services/customerOrderService";

function formatDate(value?: string): string {
  if (!value) {
    return "";
  }

  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function OrderCard({ order }: { order: Order }) {
  const itemCount = order.order_items?.length ?? 0;

  return (
    <Link
      href={`/orders/${order.id}`}
      className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md"
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold text-gray-900">{order.order_number}</span>
          <OrderStatusBadge status={order.status} />
          <OrderStatusBadge status={order.payment_status} kind="payment" />
        </div>
        <p className="mt-1 text-xs text-gray-400">
          {formatDate(order.created_at)} · {itemCount}{" "}
          {itemCount === 1 ? "item" : "items"}
        </p>
      </div>

      <div className="text-right">
        <p className="text-lg font-bold tabular-nums text-gray-900">
          {formatMoney(order.grand_total)}
        </p>
      </div>

      <CaretRightIcon
        size={18}
        weight="bold"
        className="shrink-0 text-gray-300 transition-transform group-hover:translate-x-0.5 group-hover:text-indigo-500"
      />
    </Link>
  );
}
