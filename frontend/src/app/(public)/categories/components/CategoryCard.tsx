import Link from "next/link";
import Image from "next/image";
import { SquaresFourIcon, ArrowRightIcon } from "@phosphor-icons/react";
import type { Category } from "@/services/catalogService";

const MAXIMUM_VISIBLE_SUBCATEGORIES = 4;

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const subcategories = category.children ?? [];
  const visibleSubcategories = subcategories.slice(
    0,
    MAXIMUM_VISIBLE_SUBCATEGORIES,
  );
  const hiddenSubcategoryCount =
    subcategories.length - visibleSubcategories.length;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl">
      <Link
        href={`/shop?category=${category.slug}`}
        className="relative block h-44 cursor-pointer overflow-hidden bg-gray-100"
      >
        {category.image ? (
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-300">
            <SquaresFourIcon size={52} />
          </div>
        )}

        {subcategories.length > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-gray-700 shadow-sm backdrop-blur">
            {subcategories.length} subcategories
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 bg-black/45 px-4 py-3">
          <h2 className="text-lg font-bold text-white">{category.name}</h2>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        {category.description && (
          <p className="line-clamp-2 text-sm text-gray-500">
            {category.description}
          </p>
        )}

        {visibleSubcategories.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Explore
            </p>
            <div className="flex flex-wrap gap-2">
              {visibleSubcategories.map((child) => (
                <Link
                  key={child.id}
                  href={`/shop?category=${child.slug}`}
                  className="cursor-pointer rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
                >
                  {child.name}
                </Link>
              ))}
              {hiddenSubcategoryCount > 0 && (
                <span className="rounded-full px-3 py-1.5 text-xs font-medium text-gray-400">
                  +{hiddenSubcategoryCount} more
                </span>
              )}
            </div>
          </div>
        )}

        <Link
          href={`/shop?category=${category.slug}`}
          className="group/link mt-auto inline-flex cursor-pointer items-center gap-1.5 pt-5 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-700"
        >
          Shop all {category.name}
          <ArrowRightIcon
            size={16}
            weight="bold"
            className="transition-transform group-hover/link:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
}
