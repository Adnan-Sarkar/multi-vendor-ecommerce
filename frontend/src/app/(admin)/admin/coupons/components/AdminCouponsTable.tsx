"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TrashIcon } from "@phosphor-icons/react";
import { DataTable, type Column } from "@/components/ui";
import { formatMoney } from "@/lib/productPricing";
import { formatCouponValue, formatCouponDate } from "@/lib/coupon";
import type { Coupon } from "@/services/couponService";
import type { PaginationMeta } from "@/services/vendorProductService";
import { deleteAdminCouponAction } from "@/actions/couponActions";
import { CouponStatusBadge } from "@/components/shared/CouponStatusBadge";
import { DeleteCouponDialog } from "@/components/shared/DeleteCouponDialog";

interface AdminCouponsTableProps {
  coupons: Coupon[];
  meta: PaginationMeta;
}

export function AdminCouponsTable({ coupons, meta }: AdminCouponsTableProps) {
  const router = useRouter();
  const [deletingCoupon, setDeletingCoupon] = useState<Coupon | null>(null);

  const handleDeleted = () => {
    setDeletingCoupon(null);

    router.refresh();
  };

  const columns: Column<Coupon>[] = [
    {
      header: "Code",
      cell: (coupon) => (
        <span className="font-bold tracking-wide text-gray-900">
          {coupon.code}
        </span>
      ),
    },
    {
      header: "Vendor",
      cell: (coupon) =>
        coupon.vendor ? (
          <div className="min-w-0">
            <p className="truncate font-medium text-gray-900">
              {coupon.vendor.shop_name}
            </p>
            <p className="truncate text-xs text-gray-400">
              /{coupon.vendor.slug}
            </p>
          </div>
        ) : (
          "—"
        ),
    },
    {
      header: "Discount",
      cell: (coupon) => (
        <span className="font-medium text-gray-900">
          {formatCouponValue(coupon)}
        </span>
      ),
    },
    {
      header: "Min order",
      cell: (coupon) =>
        coupon.min_order_amount && Number(coupon.min_order_amount) > 0
          ? formatMoney(coupon.min_order_amount)
          : "—",
    },
    {
      header: "Uses",
      cell: (coupon) => (
        <span className="tabular-nums">
          {coupon.used_count}
          {coupon.max_uses ? ` / ${coupon.max_uses}` : ""}
        </span>
      ),
    },
    {
      header: "Status",
      cell: (coupon) => <CouponStatusBadge coupon={coupon} />,
    },
    {
      header: "Created",
      cell: (coupon) => formatCouponDate(coupon.created_at),
    },
    {
      header: "Actions",
      align: "right",
      cell: (coupon) => (
        <button
          onClick={() => setDeletingCoupon(coupon)}
          title="Delete coupon"
          className="cursor-pointer rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <TrashIcon size={18} />
        </button>
      ),
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={coupons}
        rowKey={(coupon) => coupon.id}
        title={`Coupons (${meta.total})`}
        emptyMessage="No coupons in the marketplace yet."
        meta={meta}
      />

      <DeleteCouponDialog
        coupon={deletingCoupon}
        onClose={() => setDeletingCoupon(null)}
        onDeleted={handleDeleted}
        deleteAction={deleteAdminCouponAction}
      />
    </>
  );
}
