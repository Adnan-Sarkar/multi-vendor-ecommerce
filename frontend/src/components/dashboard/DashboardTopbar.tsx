"use client";

import { usePathname } from "next/navigation";
import { UserAvatar } from "./UserAvatar";

function getPageTitle(pathname: string) {
  const segment = pathname.split("/").filter(Boolean).pop() ?? "dashboard";
  if (segment === "dashboard") return "Dashboard Overview";
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

type DashboardTopbarProps = {
  userName: string;
  subtitle: string;
};

export function DashboardTopbar({ userName, subtitle }: DashboardTopbarProps) {
  const pathname = usePathname();

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
      <h1 className="truncate text-lg font-semibold text-gray-800 sm:text-xl">
        {getPageTitle(pathname)}
      </h1>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold text-gray-900">{subtitle}</p>
          <p className="text-xs text-gray-500">{userName}</p>
        </div>
        <UserAvatar name={userName} />
      </div>
    </header>
  );
}
