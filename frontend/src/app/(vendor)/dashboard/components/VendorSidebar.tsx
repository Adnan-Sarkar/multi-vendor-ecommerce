"use client";

import {
  ChartLineUpIcon,
  PackageIcon,
  ClipboardTextIcon,
  TicketIcon,
  StarIcon,
  StorefrontIcon,
} from "@phosphor-icons/react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import type { SidebarItem } from "@/components/dashboard/SidebarNavItem";

const VENDOR_NAV_ITEMS: SidebarItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: ChartLineUpIcon },
  { href: "/dashboard/products", label: "Products", icon: PackageIcon },
  { href: "/dashboard/orders", label: "Orders", icon: ClipboardTextIcon },
  { href: "/dashboard/coupons", label: "Coupons", icon: TicketIcon },
  { href: "/dashboard/reviews", label: "Reviews", icon: StarIcon },
  { href: "/dashboard/shop", label: "Shop Settings", icon: StorefrontIcon },
];

export function VendorSidebar() {
  return <DashboardSidebar brand="VendorPanel" items={VENDOR_NAV_ITEMS} />;
}
