import Link from "next/link";
import { ShoppingCartIcon, HeartIcon } from "@phosphor-icons/react/dist/ssr";
import { getCartCount } from "@/services/cartService";
import { getCategories } from "@/services/catalogService";
import {
  getNotifications,
  getUnreadNotificationCount,
} from "@/services/notificationService";
import { getProfileAction } from "@/actions/profileActions";
import { UtilityBar } from "./navbar/UtilityBar";
import { SearchBar } from "./navbar/SearchBar";
import { NotificationBell } from "./navbar/NotificationBell";
import { UserMenu, type NavUser } from "./navbar/UserMenu";
import { CategoryMegaMenu } from "./navbar/CategoryMegaMenu";

export async function Navbar() {
  const [cartCount, categories, profile, notifications, unreadCount] =
    await Promise.all([
      getCartCount(),
      getCategories(),
      getProfileAction(),
      getNotifications(),
      getUnreadNotificationCount(),
    ]);

  const user: NavUser | null = profile
    ? {
        name: profile.name,
        email: profile.email,
        avatar: profile.avatar ?? null,
        role: profile.role,
      }
    : null;

  const topCategories = categories.slice(0, 6);

  return (
    <header className="sticky top-0 z-50 w-full">
      <UtilityBar showSellLink={!user} />

      <div className="border-b border-gray-100 bg-white/95 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center gap-3 px-4">
          <Link
            href="/"
            className="shrink-0 text-xl font-bold tracking-tight text-indigo-600"
          >
            MultiVendor
          </Link>

          <div className="flex min-w-0 flex-1 md:justify-center md:px-4">
            <div className="w-full md:max-w-xl">
              <SearchBar />
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            {user && (
              <NotificationBell
                initialNotifications={notifications}
                initialUnreadCount={unreadCount}
              />
            )}
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="hidden cursor-pointer rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 md:block"
            >
              <HeartIcon size={24} />
            </Link>
            <Link
              href="/cart"
              aria-label="Cart"
              className="relative cursor-pointer rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              <ShoppingCartIcon size={24} />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-indigo-600 px-1 text-[10px] font-bold text-white">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>
            <div className="ml-1">
              <UserMenu user={user} />
            </div>
          </div>
        </div>
      </div>

      <div className="hidden border-b border-gray-100 bg-white shadow-sm lg:block">
        <div className="container mx-auto flex h-12 items-center px-4">
          <CategoryMegaMenu categories={categories} />

          <span className="mx-3 h-5 w-px bg-gray-200" />

          <nav className="flex items-center gap-0.5">
            <Link
              href="/shop"
              className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-indigo-600"
            >
              Shop
            </Link>
            <Link
              href="/vendors"
              className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-indigo-600"
            >
              Vendors
            </Link>
            {topCategories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className="cursor-pointer whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-indigo-600"
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
