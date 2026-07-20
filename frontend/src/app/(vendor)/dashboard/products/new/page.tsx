import Link from "next/link";
import { CaretLeftIcon } from "@phosphor-icons/react/ssr";
import { getCategories, getTags } from "@/services/catalogService";
import { createProductAction } from "@/actions/productActions";
import { ProductForm } from "../components/ProductForm";

export default async function NewProductPage() {
  const [categories, tags] = await Promise.all([getCategories(), getTags()]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/products"
          className="cursor-pointer rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900"
        >
          <CaretLeftIcon size={24} weight="bold" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
          <p className="mt-0.5 text-sm text-gray-500">
            New products are submitted for admin approval before going live.
          </p>
        </div>
      </div>

      <ProductForm
        action={createProductAction}
        categories={categories}
        tags={tags}
        submitLabel="Create Product"
        pendingLabel="Creating..."
      />
    </div>
  );
}
