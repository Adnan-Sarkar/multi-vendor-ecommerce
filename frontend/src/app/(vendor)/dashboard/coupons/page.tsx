import { getVendorCoupons } from "@/services/couponService";
import { CouponsTable } from "./components/CouponsTable";

interface VendorCouponsPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function VendorCouponsPage({
  searchParams,
}: VendorCouponsPageProps) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const { data, meta } = await getVendorCoupons(currentPage);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Coupons</h1>
        <p className="mt-1 text-sm text-gray-500">
          Create discount codes for your shop. A coupon only applies to your own
          products in a customer&apos;s cart.
        </p>
      </div>

      <CouponsTable coupons={data} meta={meta} />
    </div>
  );
}
