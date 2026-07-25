import { getCategories } from "@/services/catalogService";
import { CategoriesExplorer } from "./components/CategoriesExplorer";

export default async function CategoriesPage() {
  const categories = await getCategories();
  const activeCategories = categories.filter(
    (category) => category.is_active !== false,
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shop by Category
        </h1>
        <p className="mt-3 max-w-2xl text-gray-500">
          Discover products across {activeCategories.length} categories. Browse a
          full collection or jump straight into a subcategory.
        </p>
      </div>

      <CategoriesExplorer categories={activeCategories} />
    </div>
  );
}
