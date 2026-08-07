import Link from "next/link";
import {
  ArrowRightIcon,
  StorefrontIcon,
  ShieldCheckIcon,
  TruckIcon,
  SealCheckIcon,
} from "@phosphor-icons/react/dist/ssr";

const trustPoints = [
  { icon: <SealCheckIcon size={18} weight="fill" />, label: "Verified vendors" },
  { icon: <ShieldCheckIcon size={18} weight="fill" />, label: "Secure checkout" },
  { icon: <TruckIcon size={18} weight="fill" />, label: "Fast delivery" },
];

export function HomeHero() {
  return (
    <section className="bg-indigo-50">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-4 py-1.5 text-sm font-semibold text-indigo-600">
            <StorefrontIcon size={16} weight="fill" />
            One marketplace, many trusted shops
          </span>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Discover Premium Products
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Shop directly from verified vendors across the marketplace. Great
            quality, fair prices, delivered to your door.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/shop"
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-indigo-600 px-8 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-indigo-700 sm:w-auto"
            >
              Start Shopping
              <ArrowRightIcon size={18} weight="bold" />
            </Link>
            <Link
              href="/register-vendor"
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-indigo-200 bg-white px-8 py-3 font-semibold text-indigo-600 transition-colors hover:bg-indigo-50 sm:w-auto"
            >
              <StorefrontIcon size={18} weight="bold" />
              Become a Vendor
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {trustPoints.map((point) => (
              <span
                key={point.label}
                className="flex items-center gap-2 text-sm font-medium text-gray-600"
              >
                <span className="text-indigo-600">{point.icon}</span>
                {point.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
