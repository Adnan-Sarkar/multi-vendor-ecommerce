"use client";

import { logoutAction } from "@/actions/authActions";
import { SignOutIcon } from "@phosphor-icons/react";
import { SidebarNavItem, type SidebarItem } from "./SidebarNavItem";

type DashboardSidebarProps = {
  brand: string;
  items: SidebarItem[];
};

export function DashboardSidebar({ brand, items }: DashboardSidebarProps) {
  return (
    <aside className="flex w-16 flex-col border-r border-gray-200 bg-white md:w-64">
      <div className="flex h-16 items-center justify-center border-b border-gray-200 px-2 md:justify-start md:px-6">
        <span className="text-xl font-bold text-indigo-600 md:hidden">{brand.charAt(0)}</span>
        <span className="hidden text-xl font-bold text-indigo-600 md:block">{brand}</span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3 md:p-4">
        {items.map((item) => (
          <SidebarNavItem key={item.href} {...item} />
        ))}
      </nav>

      <div className="border-t border-gray-200 p-3 md:p-4">
        <form action={logoutAction}>
          <button
            type="submit"
            title="Logout"
            className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 md:justify-start"
          >
            <SignOutIcon size={20} />
            <span className="hidden md:inline">Logout</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
