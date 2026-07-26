"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FunnelIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui";
import type { Category } from "@/services/catalogService";

interface ShopFiltersProps {
  categories: Category[];
  selectedCategories: string[];
}

function collectCategorySlugs(category: Category): string[] {
  return [
    category.slug,
    ...(category.children ?? []).map((child) => child.slug),
  ];
}

export function ShopFilters({
  categories,
  selectedCategories,
}: ShopFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [checkedSlugs, setCheckedSlugs] =
    useState<string[]>(selectedCategories);
  const [minPrice, setMinPrice] = useState(searchParams.get("min") ?? "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("max") ?? "");
  const [inStockOnly, setInStockOnly] = useState(
    searchParams.get("in_stock") === "1",
  );

  const addSlugs = (slugs: string[]) =>
    setCheckedSlugs((current) => [...new Set([...current, ...slugs])]);

  const removeSlugs = (slugs: string[]) =>
    setCheckedSlugs((current) =>
      current.filter((slug) => !slugs.includes(slug)),
    );

  const toggleParentCategory = (category: Category) => {
    const groupSlugs = collectCategorySlugs(category);
    const isFullySelected = groupSlugs.every((slug) =>
      checkedSlugs.includes(slug),
    );

    if (isFullySelected) {
      removeSlugs(groupSlugs);
    } else {
      addSlugs(groupSlugs);
    }
  };

  const toggleChildCategory = (childSlug: string) => {
    if (checkedSlugs.includes(childSlug)) {
      removeSlugs([childSlug]);
    } else {
      addSlugs([childSlug]);
    }
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (checkedSlugs.length > 0) {
      params.set("categories", checkedSlugs.join(","));
    } else {
      params.delete("categories");
    }

    if (minPrice) {
      params.set("min", minPrice);
    } else {
      params.delete("min");
    }

    if (maxPrice) {
      params.set("max", maxPrice);
    } else {
      params.delete("max");
    }

    if (inStockOnly) {
      params.set("in_stock", "1");
    } else {
      params.delete("in_stock");
    }

    params.delete("page");

    router.push(`/shop?${params.toString()}`);
  };

  const clearFilters = () => {
    setCheckedSlugs([]);
    setMinPrice("");
    setMaxPrice("");
    setInStockOnly(false);
    router.push("/shop");
  };

  const activeFilterCount =
    checkedSlugs.length +
    (minPrice ? 1 : 0) +
    (maxPrice ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  return (
    <aside className="w-full shrink-0 lg:w-72">
      <div className="lg:sticky lg:top-24">
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <div className="flex items-center gap-2">
              <FunnelIcon size={18} weight="bold" className="text-indigo-600" />
              <h2 className="text-base font-bold text-gray-900">Filters</h2>
            </div>

            {activeFilterCount > 0 && (
              <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
                {activeFilterCount} active
              </span>
            )}
          </div>

          <div className="space-y-6 px-5 py-5">
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Categories
              </h3>

              {categories.length === 0 ? (
                <p className="text-sm text-gray-400">
                  No categories available.
                </p>
              ) : (
                <ul className="space-y-2.5">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <label className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-gray-50">
                        <input
                          type="checkbox"
                          checked={collectCategorySlugs(category).every(
                            (slug) => checkedSlugs.includes(slug),
                          )}
                          onChange={() => toggleParentCategory(category)}
                          className="h-4 w-4 cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          {category.name}
                        </span>
                      </label>

                      {(category.children ?? []).length > 0 && (
                        <ul className="mt-1 space-y-1 border-l border-gray-100 pl-4">
                          {category.children?.map((child) => (
                            <li key={child.id}>
                              <label className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-gray-50">
                                <input
                                  type="checkbox"
                                  checked={checkedSlugs.includes(child.slug)}
                                  onChange={() =>
                                    toggleChildCategory(child.slug)
                                  }
                                  className="h-4 w-4 cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className="text-sm text-gray-500">
                                  {child.name}
                                </span>
                              </label>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-gray-100 pt-5">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
                Price Range
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-500">
                    Min
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                      $
                    </span>
                    <input
                      type="number"
                      min="0"
                      placeholder="0"
                      value={minPrice}
                      onChange={(event) => setMinPrice(event.target.value)}
                      className="w-full rounded-lg border border-gray-200 py-2 pl-7 pr-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-500">
                    Max
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                      $
                    </span>
                    <input
                      type="number"
                      min="0"
                      placeholder="Any"
                      value={maxPrice}
                      onChange={(event) => setMaxPrice(event.target.value)}
                      className="w-full rounded-lg border border-gray-200 py-2 pl-7 pr-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-5">
              <label className="flex cursor-pointer items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  In stock only
                </span>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(event) => setInStockOnly(event.target.checked)}
                  className="h-4 w-4 cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </label>
            </div>

            <div className="flex flex-col gap-2.5 border-t border-gray-100 pt-5">
              <Button onClick={applyFilters} fullWidth>
                Apply Filters
              </Button>
              <Button onClick={clearFilters} variant="ghost" fullWidth>
                Clear All
              </Button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
