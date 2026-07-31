"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SlidersHorizontalIcon } from "@phosphor-icons/react";
import { DataTable, type Column } from "@/components/ui";
import { formatMoney } from "@/lib/productPricing";
import { OrderStatusBadge } from "@/components/shared/OrderStatusBadge";
import type { VendorOrder } from "@/services/vendorOrderService";
import type { PaginationMeta } from "@/services/vendorProductService";
import { VendorOrderManageModal } from "./VendorOrderManageModal";

interface VendorOrdersTableProps {
  orders: VendorOrder[];
  meta: PaginationMeta;
}

function formatDate(value?: string): string {
  if (!value) {
    return "—";
  }

  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function VendorOrdersTable({ orders, meta }: VendorOrdersTableProps) {
  const router = useRouter();
  const [selectedOrder, setSelectedOrder] = useState<VendorOrder | null>(null);

  const columns: Column<VendorOrder>[] = [
    {
      header: "Order",
      cell: (order) => (
        <div>
          <p className="font-bold text-gray-900">
            {order.order?.order_number ?? "—"}
          </p>
          <p className="text-xs text-gray-400">
            {formatDate(order.order?.created_at)}
          </p>
        </div>
      ),
    },
    {
      header: "Customer",
      cell: (order) => order.order?.shipping_address?.name ?? "—",
    },
    {
      header: "Items",
      cell: (order) => `${order.order_items?.length ?? 0}`,
    },
    {
      header: "Earning",
      cell: (order) => (
        <span className="font-medium text-gray-900">
          {formatMoney(order.vendor_earning)}
        </span>
      ),
    },
    {
      header: "Status",
      cell: (order) => <OrderStatusBadge status={order.status} />,
    },
    {
      header: "Tracking",
      cell: (order) =>
        order.tracking_number ? (
          <span className="text-xs text-gray-600">{order.tracking_number}</span>
        ) : (
          <span className="text-xs text-gray-300">—</span>
        ),
    },
    {
      header: "Actions",
      align: "right",
      cell: (order) => (
        <button
          onClick={() => setSelectedOrder(order)}
          title="Manage order"
          className="cursor-pointer rounded-lg p-2 text-gray-400 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
        >
          <SlidersHorizontalIcon size={18} />
        </button>
      ),
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={orders}
        rowKey={(order) => order.id}
        title={`Orders (${meta.total})`}
        emptyMessage="No orders yet."
        meta={meta}
      />

      {selectedOrder && (
        <VendorOrderManageModal
          key={selectedOrder.id}
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdated={() => {
            setSelectedOrder(null);
            router.refresh();
          }}
        />
      )}
    </>
  );
}
