import Image from "next/image";
import Link from "next/link";
import { SquaresFourIcon } from "@phosphor-icons/react/dist/ssr";
import type { Category } from "@/services/catalogService";
import { SectionHeading } from "./SectionHeading";

interface CategoryShowcaseProps {
  categories: Category[];
}

export function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  if (categories.length === 0) {
    return null;
  }

  const visibleCategories = categories.slice(0, 8);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        title="Shop by Category"
        subtitle="Find what you need faster"
        viewAllHref="/categories"
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {visibleCategories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.id}`}
            className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 transition-colors hover:border-indigo-200 hover:bg-indigo-50"
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
              {category.image ? (
                <Image
                  src={category.image}
                  alt={category.name}
                  width={56}
                  height={56}
                  className="h-full w-full object-cover"
                />
              ) : (
                <SquaresFourIcon size={24} className="text-indigo-600" />
              )}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-gray-900 group-hover:text-indigo-600">
                {category.name}
              </span>
              {typeof category.products_count === "number" && (
                <span className="block text-xs text-gray-400">
                  {category.products_count} products
                </span>
              )}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
