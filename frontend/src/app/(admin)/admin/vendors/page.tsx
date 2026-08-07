import { getVendors } from "@/services/adminVendorService";
import { VendorsTable } from "./components/VendorsTable";
import { VendorStatusTabs } from "./components/VendorStatusTabs";

interface AdminVendorsPageProps {
  searchParams: Promise<{ page?: string; status?: string }>;
}

const ALLOWED_STATUSES = ["pending", "approved", "rejected"];

export default async function AdminVendorsPage({
  searchParams,
}: AdminVendorsPageProps) {
  const { page, status } = await searchParams;
  const currentPage = Number(page) || 1;
  const activeStatus =
    status && ALLOWED_STATUSES.includes(status) ? status : "";

  const { data, meta } = await getVendors(currentPage, activeStatus);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Vendors</h1>
        <p className="mt-1 text-sm text-gray-500">
          Review vendor applications and manage all vendor accounts.
        </p>
      </div>

      <VendorStatusTabs activeStatus={activeStatus} />

      <VendorsTable vendors={data} meta={meta} />
    </div>
  );
}
