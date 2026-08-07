import type { PublicVendor } from "@/services/vendorPublicService";
import { VendorCard } from "@/components/shared/VendorCard";
import { SectionHeading } from "./SectionHeading";

interface FeaturedStoresProps {
  vendors: PublicVendor[];
}

export function FeaturedStores({ vendors }: FeaturedStoresProps) {
  if (vendors.length === 0) {
    return null;
  }

  const visibleVendors = vendors.slice(0, 4);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        title="Featured Stores"
        subtitle="Top rated shops on the marketplace"
        viewAllHref="/vendors"
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {visibleVendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </section>
  );
}
