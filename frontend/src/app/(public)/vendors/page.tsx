import { StorefrontIcon } from "@phosphor-icons/react/dist/ssr";
import { getVendors } from "@/services/vendorPublicService";
import { VendorCard } from "@/components/shared/VendorCard";
import { PagerNav } from "@/components/shared/PagerNav";
import { VendorsToolbar } from "./components/VendorsToolbar";

interface VendorsPageProps {
  searchParams: Promise<{ search?: string; sort?: string; page?: string }>;
}

export const metadata = {
  title: "Vendors | MultiVendor",
  description: "Browse trusted stores on the MultiVendor marketplace.",
};

export default async function VendorsPage({ searchParams }: VendorsPageProps) {
  const { search, sort, page } = await searchParams;

  const result = await getVendors({
    search,
    sort,
    page: page ? Number(page) : 1,
  });

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Browse Stores
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Discover {result.meta.total} trusted vendors on the marketplace.
        </p>
      </div>

      <div className="mb-8">
        <VendorsToolbar />
      </div>

      {result.data.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gray-200 px-6 py-20 text-gray-400">
          <StorefrontIcon size={44} />
          <p className="text-sm">No stores found.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {result.data.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>

          <PagerNav
            currentPage={result.meta.current_page}
            lastPage={result.meta.last_page}
            basePath="/vendors"
          />
        </>
      )}
    </div>
  );
}
