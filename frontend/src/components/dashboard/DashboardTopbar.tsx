"use client";

import { usePathname } from "next/navigation";
import { UserAvatar } from "./UserAvatar";

function toTitleCase(value: string) {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function toSingular(value: string) {
  return value.endsWith("s") ? value.slice(0, -1) : value;
}

function isNumericId(value: string) {
  return /^\d+$/.test(value);
}

function getPageTitle(pathname: string) {
  const segments = pathname
    .split("/")
    .filter(Boolean)
    .filter((segment) => segment !== "dashboard");

  if (segments.length === 0) return "Dashboard Overview";

  const lastSegment = segments[segments.length - 1];
  const parentSegment = segments[segments.length - 2];

  if (isNumericId(lastSegment) && parentSegment) {
    return `${toTitleCase(toSingular(parentSegment))} Details`;
  }

  if (lastSegment === "new" && parentSegment) {
    return `New ${toTitleCase(toSingular(parentSegment))}`;
  }

  if (lastSegment === "edit" && parentSegment && isNumericId(parentSegment)) {
    const sectionSegment = segments[segments.length - 3];
    return sectionSegment ? `Edit ${toTitleCase(toSingular(sectionSegment))}` : "Edit";
  }

  return toTitleCase(lastSegment);
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
