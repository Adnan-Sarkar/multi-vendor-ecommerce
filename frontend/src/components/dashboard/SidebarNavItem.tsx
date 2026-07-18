"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Icon } from "@phosphor-icons/react";

export type SidebarItem = {
  href: string;
  label: string;
  icon: Icon;
  exact?: boolean;
};

export function SidebarNavItem({ href, label, icon: ItemIcon, exact }: SidebarItem) {
  const pathname = usePathname();
  const useExact = exact ?? href === "/dashboard";
  const isActive = useExact ? pathname === href : pathname.startsWith(href);

  const base =
    "flex items-center justify-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors md:justify-start";
  const state = isActive
    ? "bg-indigo-50 text-indigo-700"
    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900";

  return (
    <Link
      href={href}
      title={label}
      aria-current={isActive ? "page" : undefined}
      className={`${base} ${state}`}
    >
      <ItemIcon size={20} weight={isActive ? "fill" : "regular"} />
      <span className="hidden md:inline">{label}</span>
    </Link>
  );
}
