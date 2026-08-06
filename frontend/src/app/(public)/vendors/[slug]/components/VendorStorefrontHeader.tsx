import Image from "next/image";
import {
  MapPinIcon,
  StarIcon,
  PackageIcon,
  SealCheckIcon,
  CalendarBlankIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { PublicVendor } from "@/services/vendorPublicService";

interface VendorStorefrontHeaderProps {
  vendor: PublicVendor;
}

function formatMemberSince(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function VendorStorefrontHeader({
  vendor,
}: VendorStorefrontHeaderProps) {
  const location = [vendor.city, vendor.state].filter(Boolean).join(", ");
  const initial = vendor.shop_name.charAt(0).toUpperCase();
  const stats = vendor.stats;

  const statTiles = [
    {
      icon: <PackageIcon size={20} />,
      label: "Products",
      value: String(stats?.products_count ?? 0),
    },
    {
      icon: <StarIcon size={20} weight="fill" />,
      label: "Rating",
      value: stats?.average_rating
        ? `${stats.average_rating.toFixed(1)} (${stats.review_count})`
        : "New",
    },
    {
      icon: <SealCheckIcon size={20} />,
      label: "Completion",
      value: `${stats?.completion_rate ?? 0}%`,
    },
    {
      icon: <CalendarBlankIcon size={20} />,
      label: "Member since",
      value: formatMemberSince(vendor.member_since),
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="relative h-40 bg-indigo-50 sm:h-52">
        {vendor.banner && (
          <Image
            src={vendor.banner}
            alt={vendor.shop_name}
            fill
            className="object-cover"
            priority
          />
        )}
      </div>

      <div className="px-5 pb-6 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="relative z-10 -mt-12 flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-white shadow-md">
            {vendor.logo ? (
              <Image
                src={vendor.logo}
                alt={vendor.shop_name}
                width={96}
                height={96}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center bg-indigo-600 text-3xl font-bold text-white">
                {initial}
              </span>
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              {vendor.shop_name}
            </h1>
            {location && (
              <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                <MapPinIcon size={15} />
                {location}
              </p>
            )}
          </div>
        </div>

        {vendor.description && (
          <p className="mt-5 max-w-3xl leading-relaxed text-gray-600">
            {vendor.description}
          </p>
        )}

        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {statTiles.map((tile) => (
            <div
              key={tile.label}
              className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-indigo-600 shadow-sm">
                {tile.icon}
              </span>
              <span className="min-w-0">
                <span className="block text-base font-bold text-gray-900">
                  {tile.value}
                </span>
                <span className="block text-xs text-gray-400">
                  {tile.label}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
