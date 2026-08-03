import Link from "next/link";
import Image from "next/image";
import {
  SquaresFourIcon,
  ArrowRightIcon,
  StorefrontIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Category } from "@/services/catalogService";

interface CategoryHeroProps {
  category: Category;
}

export function CategoryHero({ category }: CategoryHeroProps) {
  const subcategories = category.children ?? [];
  const subcategoryProductCount = subcategories.reduce(
    (total, child) => total + (child.products_count ?? 0),
    0,
  );
  const productCount = (category.products_count ?? 0) + subcategoryProductCount;
  const groupSlugs = [
    category.slug,
    ...subcategories.map((child) => child.slug),
  ];
  const shopHref = `/shop?categories=${groupSlugs.join(",")}`;

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm md:flex">
      <div className="relative h-56 w-full bg-gray-100 md:h-auto md:w-2/5">
        {category.image ? (
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-300">
            <SquaresFourIcon size={72} />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-center p-8 sm:p-10">
        <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
          <StorefrontIcon size={14} weight="fill" />
          {productCount} {productCount === 1 ? "product" : "products"}
        </span>

        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {category.name}
        </h1>

        {category.description && (
          <p className="mt-3 max-w-xl leading-relaxed text-gray-500">
            {category.description}
          </p>
        )}

        <Link
          href={shopHref}
          className="mt-8 inline-flex w-fit cursor-pointer items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
        >
          Browse {category.name}
          <ArrowRightIcon size={16} weight="bold" />
        </Link>
      </div>
    </div>
  );
}
