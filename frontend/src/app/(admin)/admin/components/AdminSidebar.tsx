"use client";

import {
  ChartLineUpIcon,
  StorefrontIcon,
  PackageIcon,
  ClipboardTextIcon,
  StarIcon,
  TicketIcon,
  WalletIcon,
} from "@phosphor-icons/react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import type { SidebarItem } from "@/components/dashboard/SidebarNavItem";

const ADMIN_NAV_ITEMS: SidebarItem[] = [
  { href: "/admin", label: "Overview", icon: ChartLineUpIcon, exact: true },
  { href: "/admin/vendors", label: "Vendors", icon: StorefrontIcon },
  { href: "/admin/products", label: "Products", icon: PackageIcon },
  { href: "/admin/orders", label: "Orders", icon: ClipboardTextIcon },
  { href: "/admin/reviews", label: "Reviews", icon: StarIcon },
  { href: "/admin/coupons", label: "Coupons", icon: TicketIcon },
  { href: "/admin/withdrawals", label: "Withdrawals", icon: WalletIcon },
];

export function AdminSidebar() {
  return <DashboardSidebar brand="AdminPanel" items={ADMIN_NAV_ITEMS} />;
}
