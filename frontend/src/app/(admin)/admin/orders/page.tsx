import { getAllOrders } from "@/services/adminOrderService";
import { AdminOrdersTable } from "./components/AdminOrdersTable";

interface AdminOrdersPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function AdminOrdersPage({
  searchParams,
}: AdminOrdersPageProps) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const { data, meta } = await getAllOrders(currentPage);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="mt-1 text-sm text-gray-500">
          All orders across the marketplace.
        </p>
      </div>

      <AdminOrdersTable orders={data} meta={meta} />
    </div>
  );
}
