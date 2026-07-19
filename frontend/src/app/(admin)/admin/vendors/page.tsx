import { getPendingVendors } from "@/services/adminVendorService";
import { PendingVendorsTable } from "./components/PendingVendorsTable";

interface AdminVendorsPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function AdminVendorsPage({ searchParams }: AdminVendorsPageProps) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const { data, meta } = await getPendingVendors(currentPage);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Vendor Approvals</h1>
        <p className="mt-1 text-sm text-gray-500">
          Review pending vendor applications and verify details before approval.
        </p>
      </div>

      <PendingVendorsTable vendors={data} meta={meta} />
    </div>
  );
}
