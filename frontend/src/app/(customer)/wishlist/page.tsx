import type { Metadata } from "next";
import { Pagination } from "@/components/ui/Pagination";
import { getWishlist } from "@/services/wishlistService";
import { WishlistGrid } from "./components/WishlistGrid";

export const metadata: Metadata = {
  title: "My Wishlist | MultiVendor",
  description: "Products you have saved for later.",
};

interface WishlistPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function WishlistPage({
  searchParams,
}: WishlistPageProps) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const { data, meta } = await getWishlist(currentPage);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          My Wishlist
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {meta.total} {meta.total === 1 ? "product" : "products"} saved for
          later.
        </p>
      </div>

      <WishlistGrid key={currentPage} items={data} />

      {meta.last_page > 1 && (
        <div className="mt-8 overflow-hidden rounded-xl border border-gray-200 bg-white">
          <Pagination
            currentPage={meta.current_page}
            lastPage={meta.last_page}
            total={meta.total}
            from={meta.from}
            to={meta.to}
          />
        </div>
      )}
    </div>
  );
}
