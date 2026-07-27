"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { EyeIcon, CheckCircleIcon, PackageIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import { DataTable, type Column } from "@/components/ui";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatMoney } from "@/lib/productPricing";
import type { AdminProduct } from "@/services/adminProductService";
import type { PaginationMeta } from "@/services/vendorProductService";
import {
  approveProductAction,
  rejectProductAction,
  type AdminProductActionResult,
} from "@/actions/adminProductActions";
import { ProductModerationModal } from "./ProductModerationModal";

interface PendingProductsTableProps {
  products: AdminProduct[];
  meta: PaginationMeta;
}

function formatDate(value: string | undefined): string {
  if (!value) {
    return "—";
  }

  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function PendingProductsTable({
  products,
  meta,
}: PendingProductsTableProps) {
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<AdminProduct | null>(
    null,
  );
  const [processingProductId, setProcessingProductId] = useState<number | null>(
    null,
  );
  const [isProcessing, startProcessing] = useTransition();

  const runAction = (
    productId: number,
    action: () => Promise<AdminProductActionResult>,
  ) => {
    setProcessingProductId(productId);
    startProcessing(async () => {
      const result = await action();

      if (result.success) {
        toast.success(result.message);
        setSelectedProduct(null);
        router.refresh();
      } else {
        toast.error(result.message);
      }

      setProcessingProductId(null);
    });
  };

  const approveProduct = (productId: number) =>
    runAction(productId, () => approveProductAction(productId));

  const rejectProduct = (productId: number, reason: string) =>
    runAction(productId, () => rejectProductAction(productId, reason));

  const isProductProcessing = (productId: number) =>
    isProcessing && processingProductId === productId;

  const columns: Column<AdminProduct>[] = [
    {
      header: "Product",
      cell: (product) => (
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100 text-gray-400">
            {product.thumbnail ? (
              <Image
                src={product.thumbnail}
                alt={product.name}
                width={44}
                height={44}
                className="h-full w-full object-cover"
              />
            ) : (
              <PackageIcon size={20} />
            )}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-gray-900">{product.name}</p>
            <p className="text-xs text-gray-400">{product.sku}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Vendor",
      cell: (product) => product.vendor?.shop_name ?? "—",
    },
    {
      header: "Price",
      cell: (product) => (
        <span className="font-medium text-gray-900">
          {formatMoney(product.regular_price)}
        </span>
      ),
    },
    {
      header: "Submitted",
      cell: (product) => formatDate(product.created_at),
    },
    {
      header: "Status",
      cell: (product) => <StatusBadge status={product.status} />,
    },
    {
      header: "Actions",
      align: "right",
      cell: (product) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => setSelectedProduct(product)}
            title="Review product"
            className="cursor-pointer rounded-lg p-2 text-gray-400 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
          >
            <EyeIcon size={20} />
          </button>
          {product.status === "pending" && (
            <button
              onClick={() => approveProduct(product.id)}
              disabled={isProductProcessing(product.id)}
              title="Approve product"
              className="cursor-pointer rounded-lg p-2 text-gray-400 transition-colors hover:bg-green-50 hover:text-green-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CheckCircleIcon size={20} />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={products}
        rowKey={(product) => product.id}
        title={`Products (${meta.total})`}
        emptyMessage="No products found."
        meta={meta}
      />

      <ProductModerationModal
        product={selectedProduct}
        busy={selectedProduct ? isProductProcessing(selectedProduct.id) : false}
        onClose={() => setSelectedProduct(null)}
        onApprove={approveProduct}
        onReject={rejectProduct}
      />
    </>
  );
}
