"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";

type PaginationProps = {
  currentPage: number;
  lastPage: number;
  total: number;
  from: number | null;
  to: number | null;
};

export function Pagination({ currentPage, lastPage, total, from, to }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (lastPage <= 1) return null;

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= lastPage;

  return (
    <div className="flex items-center justify-between gap-4 border-t border-gray-200 px-6 py-4">
      <p className="text-sm text-gray-500">
        Showing {from ?? 0}–{to ?? 0} of {total}
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={isFirstPage}
          className="cursor-pointer inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CaretLeftIcon size={16} weight="bold" />
          Previous
        </button>
        <span className="text-sm font-medium text-gray-500">
          Page {currentPage} of {lastPage}
        </span>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={isLastPage}
          className="cursor-pointer inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
          <CaretRightIcon size={16} weight="bold" />
        </button>
      </div>
    </div>
  );
}
