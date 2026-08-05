"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr";

interface SearchBarProps {
  className?: string;
  autoFocus?: boolean;
  onSubmitted?: () => void;
}

export function SearchBar({
  className = "",
  autoFocus = false,
  onSubmitted,
}: SearchBarProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTerm = searchTerm.trim();
    const destination = trimmedTerm
      ? `/shop?search=${encodeURIComponent(trimmedTerm)}`
      : "/shop";

    router.push(destination);
    onSubmitted?.();
  }

  return (
    <form onSubmit={handleSubmit} className={`relative w-full ${className}`}>
      <input
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        autoFocus={autoFocus}
        placeholder="Search products, brands and categories..."
        className="h-11 w-full rounded-full border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-900 transition-shadow placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 sm:pr-24"
      />
      <MagnifyingGlassIcon
        size={20}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />
      <button
        type="submit"
        className="absolute right-1.5 top-1/2 hidden -translate-y-1/2 cursor-pointer rounded-full bg-indigo-600 px-5 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 sm:block"
      >
        Search
      </button>
    </form>
  );
}
