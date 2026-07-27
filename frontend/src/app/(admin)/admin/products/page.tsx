import { getAdminProducts } from "@/services/adminProductService";
import { PendingProductsTable } from "./components/PendingProductsTable";
import { ProductStatusTabs } from "./components/ProductStatusTabs";

interface AdminProductsPageProps {
  searchParams: Promise<{ page?: string; status?: string }>;
}

const ALLOWED_STATUSES = ["pending", "approved", "rejected"];

export default async function AdminProductsPage({
  searchParams,
}: AdminProductsPageProps) {
  const { page, status } = await searchParams;
  const currentPage = Number(page) || 1;
  const activeStatus =
    status && ALLOWED_STATUSES.includes(status) ? status : "";

  const { data, meta } = await getAdminProducts(currentPage, activeStatus);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <p className="mt-1 text-sm text-gray-500">
          Review vendor products and approve or reject them. Only approved
          products appear in the store.
        </p>
      </div>

      <ProductStatusTabs activeStatus={activeStatus} />

      <PendingProductsTable products={data} meta={meta} />
    </div>
  );
}
