import Image from "next/image";
import Link from "next/link";
import {
  StorefrontIcon,
  MapPinIcon,
  StarIcon,
  PackageIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { PublicVendor } from "@/services/vendorPublicService";

interface VendorCardProps {
  vendor: PublicVendor;
}

export function VendorCard({ vendor }: VendorCardProps) {
  const location = [vendor.city, vendor.state].filter(Boolean).join(", ");
  const initial = vendor.shop_name.charAt(0).toUpperCase();

  return (
    <Link
      href={`/vendors/${vendor.slug}`}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:border-indigo-200 hover:shadow-md"
    >
      <div className="relative h-24 bg-indigo-50">
        {vendor.banner && (
          <Image
            src={vendor.banner}
            alt={vendor.shop_name}
            fill
            className="object-cover"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5">
        <div className="relative z-10 -mt-8 mb-3 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-white shadow-sm">
          {vendor.logo ? (
            <Image
              src={vendor.logo}
              alt={vendor.shop_name}
              width={64}
              height={64}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center bg-indigo-600 text-xl font-bold text-white">
              {initial}
            </span>
          )}
        </div>

        <h3 className="text-base font-bold text-gray-900 transition-colors group-hover:text-indigo-600">
          {vendor.shop_name}
        </h3>

        {location && (
          <p className="mt-1 flex items-center gap-1 text-sm text-gray-400">
            <MapPinIcon size={14} />
            {location}
          </p>
        )}

        <div className="mt-4 flex items-center gap-4 border-t border-gray-100 pt-4 text-sm">
          <span className="flex items-center gap-1 text-amber-500">
            <StarIcon size={15} weight="fill" />
            <span className="font-semibold text-gray-700">
              {vendor.average_rating ? vendor.average_rating.toFixed(1) : "New"}
            </span>
          </span>
          <span className="flex items-center gap-1 text-gray-500">
            <PackageIcon size={15} />
            {vendor.products_count ?? 0} products
          </span>
        </div>

        <span className="mt-4 flex items-center justify-center gap-1.5 rounded-lg bg-gray-50 py-2 text-sm font-semibold text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
          <StorefrontIcon size={16} weight="bold" />
          Visit Store
        </span>
      </div>
    </Link>
  );
}
