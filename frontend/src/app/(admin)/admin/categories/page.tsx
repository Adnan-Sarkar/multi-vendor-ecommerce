import { getCategories } from "@/services/catalogService";
import { CategoriesTable } from "./components/CategoriesTable";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
        <p className="mt-1 text-sm text-gray-500">
          Organize the catalog by creating and managing product categories.
        </p>
      </div>

      <CategoriesTable categories={categories} />
    </div>
  );
}
