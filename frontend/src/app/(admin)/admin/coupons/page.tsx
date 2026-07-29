import { getAdminCoupons } from "@/services/couponService";
import { AdminCouponsTable } from "./components/AdminCouponsTable";

interface AdminCouponsPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function AdminCouponsPage({
  searchParams,
}: AdminCouponsPageProps) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const { data, meta } = await getAdminCoupons(currentPage);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Coupons</h1>
        <p className="mt-1 text-sm text-gray-500">
          All vendor coupons across the marketplace. Remove any that violate
          policy.
        </p>
      </div>

      <AdminCouponsTable coupons={data} meta={meta} />
    </div>
  );
}
