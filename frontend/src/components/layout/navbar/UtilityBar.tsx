import Link from "next/link";
import {
  StorefrontIcon,
  PackageIcon,
} from "@phosphor-icons/react/dist/ssr";

interface UtilityBarProps {
  showSellLink: boolean;
}

export function UtilityBar({ showSellLink }: UtilityBarProps) {
  return (
    <div className="hidden border-b border-gray-100 bg-gray-50 md:block">
      <div className="container mx-auto flex h-9 items-center justify-between px-4">
        <p className="text-xs text-gray-500">
          Your trusted multi-vendor marketplace
        </p>

        <div className="flex items-center gap-5">
          <Link
            href="/orders"
            className="flex cursor-pointer items-center gap-1.5 text-xs font-medium text-gray-600 transition-colors hover:text-indigo-600"
          >
            <PackageIcon size={15} />
            Track Order
          </Link>
          {showSellLink && (
            <>
              <span className="h-3 w-px bg-gray-200" />
              <Link
                href="/register-vendor"
                className="flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-indigo-600 transition-colors hover:text-indigo-700"
              >
                <StorefrontIcon size={15} weight="bold" />
                Sell on MultiVendor
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
