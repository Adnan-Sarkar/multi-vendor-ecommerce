"use client";

import { useState } from "react";
import Link from "next/link";
import {
  SquaresFourIcon,
  CaretDownIcon,
  ArrowRightIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Category } from "@/services/catalogService";

interface CategoryMegaMenuProps {
  categories: Category[];
}

export function CategoryMegaMenu({ categories }: CategoryMegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        className={`flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
          isOpen
            ? "bg-indigo-50 text-indigo-700"
            : "text-gray-800 hover:bg-gray-100"
        }`}
      >
        <SquaresFourIcon size={18} weight="fill" className="text-indigo-600" />
        Browse Categories
        <CaretDownIcon
          size={13}
          weight="bold"
          className={`text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && categories.length > 0 && (
        <div className="absolute left-0 top-full z-50 pt-2">
          <div className="w-[min(90vw,820px)] rounded-2xl border border-gray-100 bg-white p-6 shadow-xl">
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-3">
              {categories.map((category) => (
                <div key={category.id}>
                  <Link
                    href={`/category/${category.id}`}
                    className="group flex items-center justify-between gap-2 border-b border-gray-100 pb-2 text-sm font-bold text-gray-900 transition-colors hover:text-indigo-600"
                  >
                    {category.name}
                    <ArrowRightIcon
                      size={13}
                      weight="bold"
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </Link>
                  {category.children && category.children.length > 0 && (
                    <ul className="mt-2.5 space-y-1.5">
                      {category.children.slice(0, 5).map((child) => (
                        <li key={child.id}>
                          <Link
                            href={`/shop?categories=${child.slug}`}
                            className="cursor-pointer text-sm text-gray-500 transition-colors hover:text-indigo-600"
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
