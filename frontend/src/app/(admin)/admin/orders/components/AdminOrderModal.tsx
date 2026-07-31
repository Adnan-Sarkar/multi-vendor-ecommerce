"use client";

import { Modal } from "@/components/ui";
import { formatMoney } from "@/lib/productPricing";
import { OrderStatusBadge } from "@/components/shared/OrderStatusBadge";
import type { Order } from "@/services/customerOrderService";

interface AdminOrderModalProps {
  order: Order;
  onClose: () => void;
}

export function AdminOrderModal({ order, onClose }: AdminOrderModalProps) {
  const shippingAddress = order.shipping_address;
  const discount = Number(order.coupon_discount);

  return (
    <Modal open onClose={onClose} size="lg" title={order.order_number}>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <OrderStatusBadge status={order.status} />
          <OrderStatusBadge status={order.payment_status} kind="payment" />
        </div>

        {order.customer && (
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-900">
              {order.customer.name}
            </p>
            <p className="text-xs text-gray-500">{order.customer.email}</p>
          </div>
        )}

        <div>
          <h4 className="mb-2 text-sm font-semibold text-gray-900">Items</h4>
          <div className="divide-y divide-gray-100 rounded-xl border border-gray-100">
            {order.order_items?.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm"
              >
                <span className="min-w-0 truncate text-gray-700">
                  {item.product_name}{" "}
                  <span className="text-gray-400">× {item.quantity}</span>
                </span>
                <span className="shrink-0 font-medium tabular-nums text-gray-900">
                  {formatMoney(item.total)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {order.order_vendors && order.order_vendors.length > 0 && (
          <div>
            <h4 className="mb-2 text-sm font-semibold text-gray-900">Sellers</h4>
            <div className="space-y-2">
              {order.order_vendors.map((vendorGroup) => (
                <div
                  key={vendorGroup.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-gray-100 px-4 py-2.5 text-sm"
                >
                  <span className="min-w-0 truncate text-gray-700">
                    {vendorGroup.vendor?.shop_name ?? "Seller"}
                  </span>
                  <OrderStatusBadge status={vendorGroup.status} />
                </div>
              ))}
            </div>
          </div>
        )}

        {shippingAddress && (
          <div>
            <h4 className="mb-2 text-sm font-semibold text-gray-900">
              Shipping to
            </h4>
            <p className="text-sm font-medium text-gray-900">
              {shippingAddress.name}
            </p>
            <p className="text-xs text-gray-500">{shippingAddress.phone}</p>
            <p className="mt-1 text-sm text-gray-600">
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
          </div>
        )}

        <div className="space-y-2.5 border-t border-gray-100 pt-4 text-sm">
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
          <div className="flex items-center justify-between border-t border-gray-100 pt-2.5">
            <span className="font-semibold text-gray-900">Total</span>
            <span className="text-lg font-bold tabular-nums text-indigo-700">
              {formatMoney(order.grand_total)}
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
