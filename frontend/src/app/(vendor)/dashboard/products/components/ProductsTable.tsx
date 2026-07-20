"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { EyeIcon, PencilSimpleIcon, TrashIcon, PackageIcon } from "@phosphor-icons/react";
import { DataTable, StatusBadge, Modal, Button, type Column } from "@/components/ui";
import type { VendorProduct, PaginationMeta } from "@/services/vendorProductService";
import { deleteProductAction } from "@/actions/productActions";

interface ProductsTableProps {
  products: VendorProduct[];
  meta: PaginationMeta;
}

function formatPrice(price: string | null): string {
  if (price === null) return "—";
  return `$${Number(price).toFixed(2)}`;
}

export function ProductsTable({ products, meta }: ProductsTableProps) {
  const router = useRouter();
  const [productToDelete, setProductToDelete] = useState<VendorProduct | null>(null);
  const [isDeleting, startDeleting] = useTransition();

  const confirmDelete = () => {
    if (!productToDelete) return;

    startDeleting(async () => {
      const result = await deleteProductAction(productToDelete.id);
      if (result.success) {
        toast.success(result.message);
        setProductToDelete(null);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  const columns: Column<VendorProduct>[] = [
    {
      header: "Product",
      cell: (product) => (
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100 text-gray-400">
            {product.thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={product.thumbnail} alt="" className="h-full w-full object-cover" />
            ) : (
              <PackageIcon size={20} />
            )}
          </div>
          <div className="min-w-0">
            <p className="truncate font-bold text-gray-900">{product.name}</p>
            <p className="text-xs text-gray-400">{product.sku}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Price",
      cell: (product) => (
        <span className="font-bold text-gray-900">{formatPrice(product.regular_price)}</span>
      ),
    },
    {
      header: "Stock",
      cell: (product) => (product.stock_qty ?? 0).toString(),
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
          <Link
            href={`/dashboard/products/${product.id}`}
            title="View details"
            className="cursor-pointer rounded-lg p-2 text-gray-400 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
          >
            <EyeIcon size={20} />
          </Link>
          <Link
            href={`/dashboard/products/${product.id}/edit`}
            title="Edit product"
            className="cursor-pointer rounded-lg p-2 text-gray-400 transition-colors hover:bg-amber-50 hover:text-amber-600"
          >
            <PencilSimpleIcon size={20} />
          </Link>
          <button
            onClick={() => setProductToDelete(product)}
            title="Delete product"
            className="cursor-pointer rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <TrashIcon size={20} />
          </button>
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
        title={`My Products (${meta.total})`}
        emptyMessage="No products yet. Add your first product to get started."
        meta={meta}
      />

      <Modal
        open={!!productToDelete}
        onClose={() => setProductToDelete(null)}
        title="Delete Product"
        size="sm"
        footer={
          <>
            <Button variant="outline" onClick={() => setProductToDelete(null)} disabled={isDeleting}>
              Cancel
            </Button>
            <Button
              variant="secondary"
              className="bg-red-600! hover:bg-red-700!"
              pending={isDeleting}
              pendingLabel="Deleting..."
              onClick={confirmDelete}
            >
              Delete
            </Button>
          </>
        }
      >
        <p className="text-sm text-gray-600">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-900">{productToDelete?.name}</span>? This action
          cannot be undone.
        </p>
      </Modal>
    </>
  );
}
