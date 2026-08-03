import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import type { Category } from "@/services/catalogService";

interface SubcategoryGridProps {
  subcategories: Category[];
}

export function SubcategoryGrid({ subcategories }: SubcategoryGridProps) {
  if (subcategories.length === 0) {
    return null;
  }

  return (
    <section className="mt-14">
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h2 className="text-xl font-bold tracking-tight text-gray-900">
          Browse subcategories
        </h2>
        <span className="text-sm font-medium text-gray-400">
          {subcategories.length}{" "}
          {subcategories.length === 1 ? "collection" : "collections"}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subcategories.map((subcategory) => {
          const productCount = subcategory.products_count ?? 0;

          return (
            <Link
              key={subcategory.id}
              href={`/shop?categories=${subcategory.slug}`}
              className="group flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-indigo-600 hover:bg-indigo-600 hover:shadow-xl hover:shadow-indigo-600/20"
            >
              <div className="min-w-0">
                <p className="truncate text-base font-bold text-gray-900 transition-colors duration-200 group-hover:text-white">
                  {subcategory.name}
                </p>
                <p className="mt-0.5 text-sm text-gray-400 transition-colors duration-200 group-hover:text-indigo-100">
                  {productCount} {productCount === 1 ? "product" : "products"}
                </p>
              </div>

              <ArrowRightIcon
                size={20}
                weight="bold"
                className="shrink-0 text-gray-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-white"
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
