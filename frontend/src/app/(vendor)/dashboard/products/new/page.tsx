import { ProductForm } from "./components/ProductForm";
import { CaretLeft } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link 
          href="/dashboard/products" 
          className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <CaretLeft size={24} weight="bold" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
      </div>

      <ProductForm />
    </div>
  );
}
