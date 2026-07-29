import { getAllProducts } from "@/services/productService";
import { getCategories } from "@/services/catalogService";
import { getWishlistProductIds } from "@/services/wishlistService";
import { ShopFilters } from "./components/ShopFilters";
import { ProductGrid } from "./components/ProductGrid";

interface ShopPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

function readSingleValue(
  value: string | string[] | undefined,
): string | undefined {
  return typeof value === "string" && value !== "" ? value : undefined;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;

  const categoriesParam = readSingleValue(params.categories);
  const selectedCategories = categoriesParam ? categoriesParam.split(",") : [];

  const pageParam = readSingleValue(params.page);

  const [productsResult, categories, wishlistedProductIds] = await Promise.all([
    getAllProducts({
      search: readSingleValue(params.search),
      categories: selectedCategories,
      min_price: readSingleValue(params.min),
      max_price: readSingleValue(params.max),
      in_stock: params.in_stock === "1",
      sort: readSingleValue(params.sort),
      page: pageParam ? Number(pageParam) : 1,
    }),
    getCategories(),
    getWishlistProductIds(),
  ]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-gray-900">
        All Products
      </h1>

      <div className="flex flex-col gap-8 lg:flex-row">
        <ShopFilters
          categories={categories}
          selectedCategories={selectedCategories}
        />
        <ProductGrid
          products={productsResult.data}
          meta={productsResult.meta}
          wishlistedProductIds={wishlistedProductIds}
        />
      </div>
    </div>
  );
}
