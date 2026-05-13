"use client";

import { VendorOrder } from "@/services/orderService";
import { Eye, CheckCircle } from "@phosphor-icons/react";

interface OrdersTableProps {
  orders: VendorOrder[];
}

export function OrdersTable({ orders }: OrdersTableProps) {
  const handleUpdateStatus = (id: string) => {
    // In the future this will trigger a Server Action
    if (confirm("Mark this order as Processing?")) {
      console.log("Update status for order:", id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Processing': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-600">
        <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
          <tr>
            <th className="px-6 py-4">Order ID</th>
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4">Customer</th>
            <th className="px-6 py-4">Items</th>
            <th className="px-6 py-4">Total</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50 transition-colors group">
              <td className="px-6 py-4 font-bold text-gray-900">{order.id}</td>
              <td className="px-6 py-4">{order.date}</td>
              <td className="px-6 py-4 font-medium text-gray-900">{order.customerName}</td>
              <td className="px-6 py-4">{order.itemCount} items</td>
              <td className="px-6 py-4 font-bold text-gray-900">${order.amount.toFixed(2)}</td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {order.status === 'Pending' && (
                    <button 
                      onClick={() => handleUpdateStatus(order.id)}
                      title="Mark as Processing"
                      className="p-2 text-gray-400 hover:text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                    >
                      <CheckCircle size={20} />
                    </button>
                  )}
                  <button title="View Details" className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">
                    <Eye size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

