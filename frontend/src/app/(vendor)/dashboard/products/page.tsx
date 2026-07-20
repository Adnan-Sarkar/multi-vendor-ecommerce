import Link from "next/link";
import { PlusIcon } from "@phosphor-icons/react/ssr";
import { getMyProducts } from "@/services/vendorProductService";
import { ProductsTable } from "./components/ProductsTable";

interface VendorProductsPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function VendorProductsPage({ searchParams }: VendorProductsPageProps) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const { data, meta } = await getMyProducts(currentPage);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="mt-0.5 text-sm text-gray-500">
            Manage your product catalog and track approval status.
          </p>
        </div>
        <Link
          href="/dashboard/products/new"
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
        >
          <PlusIcon size={20} weight="bold" />
          Add Product
        </Link>
      </div>

      <ProductsTable products={data} meta={meta} />
    </div>
  );
}
