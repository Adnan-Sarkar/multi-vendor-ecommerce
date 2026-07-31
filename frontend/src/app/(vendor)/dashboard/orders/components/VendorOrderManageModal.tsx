"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button, Modal } from "@/components/ui";
import { formatMoney } from "@/lib/productPricing";
import { OrderStatusBadge } from "@/components/shared/OrderStatusBadge";
import {
  updateVendorOrderStatusAction,
  updateTrackingNumberAction,
} from "@/actions/vendorOrderActions";
import type { VendorOrder } from "@/services/vendorOrderService";

interface VendorOrderManageModalProps {
  order: VendorOrder;
  onClose: () => void;
  onUpdated: () => void;
}

const STATUS_OPTIONS = ["confirmed", "processing", "shipped", "delivered"];

export function VendorOrderManageModal({
  order,
  onClose,
  onUpdated,
}: VendorOrderManageModalProps) {
  const router = useRouter();
  const [status, setStatus] = useState(
    STATUS_OPTIONS.includes(order.status) ? order.status : "confirmed",
  );
  const [trackingNumber, setTrackingNumber] = useState(
    order.tracking_number ?? "",
  );
  const [isSaving, startSaving] = useTransition();

  const runUpdate = (
    action: () => Promise<{ success: boolean; message: string }>,
  ) => {
    startSaving(async () => {
      const result = await action();

      if (result.success) {
        toast.success(result.message);

        onUpdated();
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  const saveStatus = () =>
    runUpdate(() => updateVendorOrderStatusAction(order.id, status));

  const saveTracking = () => {
    if (trackingNumber.trim().length < 5) {
      toast.error("Tracking number must be at least 5 characters.");
      return;
    }

    runUpdate(() =>
      updateTrackingNumberAction(order.id, trackingNumber.trim()),
    );
  };

  const shippingAddress = order.order?.shipping_address;

  return (
    <Modal
      open
      onClose={onClose}
      size="lg"
      title={`Order ${order.order?.order_number ?? ""}`}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <OrderStatusBadge status={order.status} />
          <span className="text-sm font-semibold text-gray-900">
            Earning: {formatMoney(order.vendor_earning)}
          </span>
        </div>

        {shippingAddress && (
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-900">
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

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="order-status"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Update status
            </label>
            <div className="flex gap-2">
              <select
                id="order-status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm capitalize text-slate-900 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15"
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option} value={option} className="capitalize">
                    {option}
                  </option>
                ))}
              </select>
              <Button size="sm" onClick={saveStatus} pending={isSaving}>
                Save
              </Button>
            </div>
          </div>

          <div>
            <label
              htmlFor="tracking-number"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Tracking number
            </label>
            <div className="flex gap-2">
              <input
                id="tracking-number"
                value={trackingNumber}
                onChange={(event) => setTrackingNumber(event.target.value)}
                placeholder="e.g., TRK123456"
                className="w-full min-w-0 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={saveTracking}
                pending={isSaving}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
