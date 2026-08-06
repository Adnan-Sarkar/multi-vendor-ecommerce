import { notFound } from "next/navigation";
import { PackageIcon } from "@phosphor-icons/react/dist/ssr";
import {
  getVendor,
  getVendorProducts,
} from "@/services/vendorPublicService";
import { getWishlistProductIds } from "@/services/wishlistService";
import { ProductCard } from "@/components/shared/ProductCard";
import { PagerNav } from "@/components/shared/PagerNav";
import { VendorStorefrontHeader } from "./components/VendorStorefrontHeader";
import { VendorProductsToolbar } from "./components/VendorProductsToolbar";

interface VendorStorefrontPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string; page?: string }>;
}

export async function generateMetadata({ params }: VendorStorefrontPageProps) {
  const { slug } = await params;
  const vendor = await getVendor(slug);

  if (!vendor) {
    return { title: "Store not found | MultiVendor" };
  }

  return {
    title: `${vendor.shop_name} | MultiVendor`,
    description:
      vendor.description ?? `Shop products from ${vendor.shop_name}.`,
  };
}

export default async function VendorStorefrontPage({
  params,
  searchParams,
}: VendorStorefrontPageProps) {
  const { slug } = await params;
  const { sort, page } = await searchParams;

  const vendor = await getVendor(slug);

  if (!vendor) {
    notFound();
  }

  const [productsResult, wishlistedProductIds] = await Promise.all([
    getVendorProducts(slug, { sort, page: page ? Number(page) : 1 }),
    getWishlistProductIds(),
  ]);

  const wishlistedSet = new Set(wishlistedProductIds);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <VendorStorefrontHeader vendor={vendor} />

      <div className="mt-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            Products
            <span className="ml-2 text-sm font-normal text-gray-400">
              ({productsResult.meta.total})
            </span>
          </h2>
          <VendorProductsToolbar slug={slug} />
        </div>

        {productsResult.data.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gray-200 px-6 py-20 text-gray-400">
            <PackageIcon size={44} />
            <p className="text-sm">This store has no products yet.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {productsResult.data.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlistedSet.has(product.id)}
                />
              ))}
            </div>

            <PagerNav
              currentPage={productsResult.meta.current_page}
              lastPage={productsResult.meta.last_page}
              basePath={`/vendors/${slug}`}
            />
          </>
        )}
      </div>
    </div>
  );
}
