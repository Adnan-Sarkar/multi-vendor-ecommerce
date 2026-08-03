import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CaretRightIcon } from "@phosphor-icons/react/dist/ssr";
import { getCategoryById } from "@/services/catalogService";
import { CategoryHero } from "./components/CategoryHero";
import { SubcategoryGrid } from "./components/SubcategoryGrid";

interface CategoryDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: CategoryDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const category = await getCategoryById(Number(id));

  return {
    title: category
      ? `${category.name} | MultiVendor`
      : "Category | MultiVendor",
  };
}

export default async function CategoryDetailPage({
  params,
}: CategoryDetailPageProps) {
  const { id } = await params;
  const category = await getCategoryById(Number(id));

  if (!category) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-gray-400">
        <Link
          href="/categories"
          className="cursor-pointer transition-colors hover:text-indigo-600"
        >
          Categories
        </Link>
        {category.parent && (
          <>
            <CaretRightIcon size={14} weight="bold" />
            <Link
              href={`/category/${category.parent.id}`}
              className="cursor-pointer transition-colors hover:text-indigo-600"
            >
              {category.parent.name}
            </Link>
          </>
        )}
        <CaretRightIcon size={14} weight="bold" />
        <span className="font-medium text-gray-700">{category.name}</span>
      </nav>

      <CategoryHero category={category} />

      <SubcategoryGrid subcategories={category.children ?? []} />
    </div>
  );
}
