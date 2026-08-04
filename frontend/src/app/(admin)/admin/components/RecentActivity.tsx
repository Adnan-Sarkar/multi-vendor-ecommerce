import { StarIcon, UserPlusIcon } from "@phosphor-icons/react/dist/ssr";
import { formatMoney } from "@/lib/productPricing";
import { OrderStatusBadge } from "@/components/shared/OrderStatusBadge";
import type {
  RecentOrder,
  RecentReview,
  RecentSignup,
} from "@/services/adminDashboardService";
import { ChartCard } from "./ChartCard";

interface RecentActivityProps {
  orders: RecentOrder[];
  reviews: RecentReview[];
  signups: RecentSignup[];
}

function formatDate(value?: string | null): string {
  if (!value) {
    return "";
  }

  return new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function EmptyRow({ message }: { message: string }) {
  return <p className="py-6 text-center text-sm text-gray-400">{message}</p>;
}

export function RecentActivity({
  orders,
  reviews,
  signups,
}: RecentActivityProps) {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <ChartCard title="Recent orders">
        {orders.length === 0 ? (
          <EmptyRow message="No orders yet." />
        ) : (
          <ul className="divide-y divide-gray-100">
            {orders.map((order) => (
              <li
                key={order.order_number}
                className="flex items-center justify-between gap-3 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {order.order_number}
                  </p>
                  <p className="truncate text-xs text-gray-400">
                    {order.customer} · {formatDate(order.created_at)}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span className="text-sm font-semibold tabular-nums text-gray-900">
                    {formatMoney(order.grand_total)}
                  </span>
                  <OrderStatusBadge status={order.status} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </ChartCard>

      <ChartCard title="Recent reviews">
        {reviews.length === 0 ? (
          <EmptyRow message="No reviews yet." />
        ) : (
          <ul className="divide-y divide-gray-100">
            {reviews.map((review, index) => (
              <li
                key={`${review.product}-${index}`}
                className="flex items-center justify-between gap-3 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {review.product}
                  </p>
                  <p className="truncate text-xs text-gray-400">
                    {review.user} · {formatDate(review.created_at)}
                  </p>
                </div>
                <span className="flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-600">
                  {review.rating}
                  <StarIcon size={12} weight="fill" />
                </span>
              </li>
            ))}
          </ul>
        )}
      </ChartCard>

      <ChartCard title="New customers">
        {signups.length === 0 ? (
          <EmptyRow message="No signups yet." />
        ) : (
          <ul className="divide-y divide-gray-100">
            {signups.map((signup, index) => (
              <li
                key={`${signup.email}-${index}`}
                className="flex items-center gap-3 py-3"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-500">
                  <UserPlusIcon size={16} />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {signup.name}
                  </p>
                  <p className="truncate text-xs text-gray-400">
                    {signup.email} · {formatDate(signup.created_at)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </ChartCard>
    </div>
  );
}
