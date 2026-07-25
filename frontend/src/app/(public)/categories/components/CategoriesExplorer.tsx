"use client";

import { useMemo, useState } from "react";
import { MagnifyingGlassIcon, SquaresFourIcon } from "@phosphor-icons/react";
import type { Category } from "@/services/catalogService";
import { CategoryCard } from "./CategoryCard";

interface CategoriesExplorerProps {
  categories: Category[];
}

export function CategoriesExplorer({ categories }: CategoriesExplorerProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) {
      return categories;
    }

    return categories.filter((category) => {
      const nameMatches = category.name.toLowerCase().includes(query);
      const subcategoryMatches = (category.children ?? []).some((child) =>
        child.name.toLowerCase().includes(query),
      );
      return nameMatches || subcategoryMatches;
    });
  }, [categories, searchTerm]);

  return (
    <div>
      <div className="relative mb-8 max-w-md">
        <MagnifyingGlassIcon
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search categories..."
          className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-11 pr-4 text-sm text-gray-900 shadow-sm outline-none transition-all placeholder:text-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15"
        />
      </div>

      {filteredCategories.length === 0 ? (
        <div className="flex items-center gap-3 rounded-2xl border border-dashed border-gray-200 px-6 py-12 text-gray-400">
          <SquaresFourIcon size={32} />
          <p className="text-sm">No categories match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
}
