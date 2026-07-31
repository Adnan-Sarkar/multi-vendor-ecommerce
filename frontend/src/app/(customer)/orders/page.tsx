import Link from "next/link";
import type { Metadata } from "next";
import { PackageIcon } from "@phosphor-icons/react/dist/ssr";
import { Pagination } from "@/components/ui/Pagination";
import { getOrders } from "@/services/customerOrderService";
import { OrderCard } from "./components/OrderCard";

export const metadata: Metadata = {
  title: "My Orders | MultiVendor",
  description: "Track and manage your orders.",
};

interface OrdersPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const { data, meta } = await getOrders(currentPage);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          My Orders
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {meta.total} {meta.total === 1 ? "order" : "orders"} placed.
        </p>
      </div>

      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-gray-200 px-6 py-20 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-indigo-400">
            <PackageIcon size={32} />
          </span>
          <p className="text-sm text-gray-500">
            You have not placed any orders yet.
          </p>
          <Link
            href="/shop"
            className="cursor-pointer rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}

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
