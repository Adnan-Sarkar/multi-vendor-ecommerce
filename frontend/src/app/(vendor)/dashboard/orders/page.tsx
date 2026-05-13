import { getVendorOrders } from "@/services/orderService";
import { OrdersTable } from "./components/OrdersTable";
import { Funnel } from "@phosphor-icons/react/dist/ssr";

export default async function VendorOrdersPage() {
  const orders = await getVendorOrders();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm">
          <Funnel size={20} />
          Filter
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <OrdersTable orders={orders} />
      </div>
    </div>
  );
}
