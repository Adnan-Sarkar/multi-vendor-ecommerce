import { getVendorOrders } from "@/services/vendorOrderService";
import { VendorOrdersTable } from "./components/VendorOrdersTable";

interface VendorOrdersPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function VendorOrdersPage({
  searchParams,
}: VendorOrdersPageProps) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const { data, meta } = await getVendorOrders(currentPage);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage orders for your products, update status and add tracking.
        </p>
      </div>

      <VendorOrdersTable orders={data} meta={meta} />
    </div>
  );
}
