"use client";

import { useState } from "react";
import { EyeIcon } from "@phosphor-icons/react";
import { DataTable, type Column } from "@/components/ui";
import { formatMoney } from "@/lib/productPricing";
import { OrderStatusBadge } from "@/components/shared/OrderStatusBadge";
import type { Order } from "@/services/customerOrderService";
import type { PaginationMeta } from "@/services/vendorProductService";
import { AdminOrderModal } from "./AdminOrderModal";

interface AdminOrdersTableProps {
  orders: Order[];
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

export function AdminOrdersTable({ orders, meta }: AdminOrdersTableProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const columns: Column<Order>[] = [
    {
      header: "Order",
      cell: (order) => (
        <div>
          <p className="font-bold text-gray-900">{order.order_number}</p>
          <p className="text-xs text-gray-400">
            {formatDate(order.created_at)}
          </p>
        </div>
      ),
    },
    {
      header: "Customer",
      cell: (order) =>
        order.customer ? (
          <div className="min-w-0">
            <p className="truncate font-medium text-gray-900">
              {order.customer.name}
            </p>
            <p className="truncate text-xs text-gray-400">
              {order.customer.email}
            </p>
          </div>
        ) : (
          "—"
        ),
    },
    {
      header: "Status",
      cell: (order) => <OrderStatusBadge status={order.status} />,
    },
    {
      header: "Payment",
      cell: (order) => (
        <OrderStatusBadge status={order.payment_status} kind="payment" />
      ),
    },
    {
      header: "Total",
      cell: (order) => (
        <span className="font-medium text-gray-900">
          {formatMoney(order.grand_total)}
        </span>
      ),
    },
    {
      header: "Actions",
      align: "right",
      cell: (order) => (
        <button
          onClick={() => setSelectedOrder(order)}
          title="View order"
          className="cursor-pointer rounded-lg p-2 text-gray-400 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
        >
          <EyeIcon size={18} />
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
        <AdminOrderModal
          key={selectedOrder.id}
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </>
  );
}
