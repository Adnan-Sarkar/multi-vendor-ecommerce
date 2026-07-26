"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";

interface ShopPaginationProps {
  currentPage: number;
  lastPage: number;
}

export function ShopPagination({ currentPage, lastPage }: ShopPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (lastPage <= 1) {
    return null;
  }

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`/shop?${params.toString()}`);
  };

  const pageNumbers = Array.from({ length: lastPage }, (_, index) => index + 1);

  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <CaretLeftIcon size={18} weight="bold" />
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={`h-10 w-10 cursor-pointer rounded-lg border text-sm font-semibold transition-colors ${
            page === currentPage
              ? "border-indigo-600 bg-indigo-600 text-white"
              : "border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= lastPage}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <CaretRightIcon size={18} weight="bold" />
      </button>
    </div>
  );
}
