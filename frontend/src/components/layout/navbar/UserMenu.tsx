"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  UserIcon,
  CaretDownIcon,
  SignOutIcon,
  ReceiptIcon,
  HeartIcon,
  GaugeIcon,
} from "@phosphor-icons/react/dist/ssr";
import { logoutAction } from "@/actions/authActions";

export interface NavUser {
  name: string;
  email: string;
  avatar: string | null;
  role: string;
}

interface UserMenuProps {
  user: NavUser | null;
}

function getDashboardLink(role: string): { href: string; label: string } | null {
  if (role === "vendor") {
    return { href: "/dashboard", label: "Vendor Dashboard" };
  }

  if (role === "admin" || role === "super_admin") {
    return { href: "/admin", label: "Admin Dashboard" };
  }

  return null;
}

export function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) {
    return (
      <>
        <Link
          href="/login"
          aria-label="Sign in"
          className="cursor-pointer rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 md:hidden"
        >
          <UserIcon size={24} />
        </Link>
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/login"
            className="cursor-pointer rounded-full px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="cursor-pointer rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            Register
          </Link>
        </div>
      </>
    );
  }

  const dashboardLink = getDashboardLink(user.role);
  const initial = user.name.charAt(0).toUpperCase();

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex cursor-pointer items-center gap-2 rounded-full py-1 pl-1 pr-2 transition-colors hover:bg-gray-100"
      >
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt={user.name}
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
            {initial}
          </span>
        )}
        <CaretDownIcon
          size={14}
          weight="bold"
          className="hidden text-gray-500 sm:block"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
          <div className="border-b border-gray-100 px-4 py-3">
            <p className="truncate text-sm font-bold text-gray-900">
              {user.name}
            </p>
            <p className="truncate text-xs text-gray-400">{user.email}</p>
          </div>

          <nav className="py-1">
            {dashboardLink && (
              <Link
                href={dashboardLink.href}
                onClick={() => setIsOpen(false)}
                className="flex cursor-pointer items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                <GaugeIcon size={18} className="text-gray-400" />
                {dashboardLink.label}
              </Link>
            )}
            <Link
              href="/account"
              onClick={() => setIsOpen(false)}
              className="flex cursor-pointer items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              <UserIcon size={18} className="text-gray-400" />
              My Account
            </Link>
            <Link
              href="/orders"
              onClick={() => setIsOpen(false)}
              className="flex cursor-pointer items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              <ReceiptIcon size={18} className="text-gray-400" />
              My Orders
            </Link>
            <Link
              href="/wishlist"
              onClick={() => setIsOpen(false)}
              className="flex cursor-pointer items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              <HeartIcon size={18} className="text-gray-400" />
              My Wishlist
            </Link>
          </nav>

          <form action={logoutAction} className="border-t border-gray-100">
            <button
              type="submit"
              className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
            >
              <SignOutIcon size={18} />
              Sign out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
