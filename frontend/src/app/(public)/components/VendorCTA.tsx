import Link from "next/link";
import {
  StorefrontIcon,
  ArrowRightIcon,
} from "@phosphor-icons/react/dist/ssr";

export function VendorCTA() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-6 rounded-3xl bg-indigo-600 px-6 py-12 text-center sm:px-12">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white">
          <StorefrontIcon size={28} weight="fill" />
        </span>

        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Start selling on MultiVendor
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-indigo-100">
            Open your own shop, list your products, and reach customers across
            the marketplace.
          </p>
        </div>

        <Link
          href="/register-vendor"
          className="flex cursor-pointer items-center gap-2 rounded-full bg-white px-8 py-3 font-semibold text-indigo-600 transition-colors hover:bg-indigo-50"
        >
          Become a Vendor
          <ArrowRightIcon size={18} weight="bold" />
        </Link>
      </div>
    </section>
  );
}
