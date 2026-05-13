import { getVendorProducts } from "@/services/productService";
import { ProductsTable } from "./components/ProductsTable";
import Link from "next/link";
import { Plus } from "@phosphor-icons/react/dist/ssr";

export default async function VendorProductsPage() {
  const products = await getVendorProducts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <Link 
          href="/dashboard/products/new" 
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus size={20} weight="bold" />
          Add Product
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <ProductsTable products={products} />
      </div>
    </div>
  );
}

