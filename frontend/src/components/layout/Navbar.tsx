import Link from "next/link";
import {
  ShoppingCartIcon,
  UserIcon,
  HeartIcon,
  ReceiptIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react/dist/ssr";
import { getCartCount } from "@/services/cartService";

export async function Navbar() {
  const cartCount = await getCartCount();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-indigo-600"
          >
            MultiVendor
          </Link>
          <nav className="hidden gap-4 md:flex">
            <Link
              href="/shop"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-black"
            >
              Shop
            </Link>
            <Link
              href="/categories"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-black"
            >
              Categories
            </Link>
            <Link
              href="/vendors"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-black"
            >
              Vendors
            </Link>
          </nav>
        </div>

        <div className="hidden flex-1 items-center justify-center px-6 md:flex">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search products..."
              className="h-10 w-full rounded-full border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/orders"
            className="cursor-pointer p-2 text-gray-600 transition-colors hover:text-black"
          >
            <ReceiptIcon size={24} />
          </Link>
          <Link
            href="/wishlist"
            className="cursor-pointer p-2 text-gray-600 transition-colors hover:text-black"
          >
            <HeartIcon size={24} />
          </Link>
          <Link
            href="/account"
            className="cursor-pointer p-2 text-gray-600 transition-colors hover:text-black"
          >
            <UserIcon size={24} />
          </Link>
          <Link
            href="/cart"
            className="relative p-2 text-gray-600 transition-colors hover:text-black"
          >
            <ShoppingCartIcon size={24} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-indigo-600 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
