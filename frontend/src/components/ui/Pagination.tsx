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

type PageItem = number | "dots";

function buildPageItems(currentPage: number, lastPage: number): PageItem[] {
  const shownPages = new Set<number>([
    1,
    lastPage,
    currentPage,
    currentPage - 1,
    currentPage + 1,
  ]);

  const sortedPages = [...shownPages]
    .filter((page) => page >= 1 && page <= lastPage)
    .sort((first, second) => first - second);

  const items: PageItem[] = [];
  let previousPage = 0;

  for (const page of sortedPages) {
    if (previousPage) {
      const gap = page - previousPage;
      if (gap === 2) {
        items.push(previousPage + 1);
      } else if (gap > 2) {
        items.push("dots");
      }
    }

    items.push(page);
    previousPage = page;
  }

  return items;
}

export function Pagination({
  currentPage,
  lastPage,
  total,
  from,
  to,
}: PaginationProps) {
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
  const pageItems = buildPageItems(currentPage, lastPage);

  return (
    <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 px-6 py-4 sm:flex-row">
      <p className="text-sm text-gray-500">
        Showing {from ?? 0}–{to ?? 0} of {total}
      </p>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={isFirstPage}
          aria-label="Previous page"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CaretLeftIcon size={16} weight="bold" />
        </button>

        {pageItems.map((item, index) =>
          item === "dots" ? (
            <span
              key={`dots-${index}`}
              className="flex h-9 w-9 items-center justify-center text-sm text-gray-400"
            >
              …
            </span>
          ) : (
            <button
              key={item}
              onClick={() => goToPage(item)}
              aria-current={item === currentPage ? "page" : undefined}
              className={`flex h-9 min-w-9 cursor-pointer items-center justify-center rounded-lg border px-2 text-sm font-semibold transition-colors ${
                item === currentPage
                  ? "border-indigo-600 bg-indigo-600 text-white"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {item}
            </button>
          ),
        )}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={isLastPage}
          aria-label="Next page"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CaretRightIcon size={16} weight="bold" />
        </button>
      </div>
    </div>
  );
}
