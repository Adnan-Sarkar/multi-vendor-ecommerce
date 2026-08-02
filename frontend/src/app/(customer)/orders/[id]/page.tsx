import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeftIcon,
  StorefrontIcon,
} from "@phosphor-icons/react/dist/ssr";
import { formatMoney } from "@/lib/productPricing";
import { OrderStatusBadge } from "@/components/shared/OrderStatusBadge";
import { getOrder } from "@/services/customerOrderService";
import { CancelOrderButton } from "./components/CancelOrderButton";
import { OrderItemReviewButton } from "./components/OrderItemReviewButton";

export const metadata: Metadata = {
  title: "Order Details | MultiVendor",
};

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

const CANCELLABLE_STATUSES = ["pending", "confirmed"];

function formatDate(value?: string | null): string {
  if (!value) {
    return "";
  }

  return new Date(value).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  sslcommerz: "Card / Online (SSLCommerz)",
  cod: "Cash on delivery",
  bkash: "bKash",
  card: "Card",
};

export default async function OrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const { id } = await params;
  const order = await getOrder(Number(id));

  if (!order) {
    notFound();
  }

  const shippingAddress = order.shipping_address;
  const discount = Number(order.coupon_discount);
  const canCancel = CANCELLABLE_STATUSES.includes(order.status);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/orders"
        className="mb-6 inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-indigo-600"
      >
        <ArrowLeftIcon size={16} weight="bold" />
        Back to orders
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            {order.order_number}
          </h1>
          <p className="mt-1 text-xs text-gray-400">
            Placed on {formatDate(order.created_at)}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <OrderStatusBadge status={order.status} />
            <OrderStatusBadge status={order.payment_status} kind="payment" />
          </div>
        </div>

        {canCancel && <CancelOrderButton orderId={order.id} />}
      </div>

      {order.status === "cancelled" && order.cancellation_reason && (
        <div className="mt-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span className="font-semibold">Cancelled:</span>{" "}
          {order.cancellation_reason}
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-gray-900">
              Items
            </h2>
            <div className="divide-y divide-gray-100">
              {order.order_items?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-gray-900">
                      {item.product_name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {item.variant_details ? `${item.variant_details} · ` : ""}
                      {formatMoney(item.unit_price)} × {item.quantity}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    {item.fulfillment_status === "delivered" &&
                      item.product_id && (
                        <OrderItemReviewButton
                          orderId={order.id}
                          productId={item.product_id}
                          productName={item.product_name}
                          alreadyReviewed={item.is_reviewed}
                        />
                      )}
                    <span className="font-semibold tabular-nums text-gray-900">
                      {formatMoney(item.total)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {order.order_vendors && order.order_vendors.length > 0 && (
            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-base font-semibold text-gray-900">
                Sellers
              </h2>
              <div className="space-y-3">
                {order.order_vendors.map((vendorGroup) => (
                  <div
                    key={vendorGroup.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-gray-100 px-4 py-3"
                  >
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-500">
                        <StorefrontIcon size={18} />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {vendorGroup.vendor?.shop_name ?? "Seller"}
                        </p>
                        {vendorGroup.tracking_number && (
                          <p className="truncate text-xs text-gray-400">
                            Tracking: {vendorGroup.tracking_number}
                          </p>
                        )}
                      </div>
                    </div>
                    <OrderStatusBadge status={vendorGroup.status} />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="space-y-6">
          {shippingAddress && (
            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-3 text-base font-semibold text-gray-900">
                Shipping to
              </h2>
              <p className="font-medium text-gray-900">
                {shippingAddress.name}
              </p>
              <p className="text-xs text-gray-500">{shippingAddress.phone}</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {[
                  shippingAddress.address_line_1,
                  shippingAddress.address_line_2,
                  [shippingAddress.city, shippingAddress.state]
                    .filter(Boolean)
                    .join(", "),
                  shippingAddress.zip_code,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            </section>
          )}

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-base font-semibold text-gray-900">
              Payment
            </h2>
            <p className="text-sm text-gray-600">
              {PAYMENT_METHOD_LABELS[order.payment_method] ??
                order.payment_method}
            </p>

            <div className="mt-4 space-y-2.5 border-t border-gray-100 pt-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium tabular-nums text-gray-900">
                  {formatMoney(order.subtotal)}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Discount</span>
                  <span className="font-medium tabular-nums text-green-600">
                    −{formatMoney(order.coupon_discount)}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className="font-medium tabular-nums text-gray-900">
                  {formatMoney(order.shipping_cost)}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-gray-100 pt-2.5">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="text-lg font-bold tabular-nums text-indigo-700">
                  {formatMoney(order.grand_total)}
                </span>
              </div>
            </div>
          </section>

          {order.notes && (
            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="mb-2 text-base font-semibold text-gray-900">
                Notes
              </h2>
              <p className="text-sm text-gray-600">{order.notes}</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
