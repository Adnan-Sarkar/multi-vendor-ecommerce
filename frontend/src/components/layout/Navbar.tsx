"use client";

import Link from 'next/link';
import { ShoppingCart, User, MagnifyingGlass } from '@phosphor-icons/react';
import { useCartStore } from '@/store/useCartStore';
import { useEffect, useState } from 'react';

export function Navbar() {
  const items = useCartStore(state => state.items);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold tracking-tight text-blue-600">
            MultiVendor
          </Link>
          <nav className="hidden md:flex gap-4">
            <Link href="/shop" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Shop</Link>
            <Link href="/categories" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Categories</Link>
            <Link href="/vendors" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">Vendors</Link>
          </nav>
        </div>
        
        <div className="flex flex-1 items-center justify-center px-6 hidden md:flex">
          <div className="relative w-full max-w-md">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full h-10 pl-10 pr-4 rounded-full border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            />
            <MagnifyingGlass className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/account" className="p-2 text-gray-600 hover:text-black transition-colors">
            <User size={24} weight="regular" />
          </Link>
          <Link href="/cart" className="relative p-2 text-gray-600 hover:text-black transition-colors">
            <ShoppingCart size={24} weight="regular" />
            {mounted && totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white border-2 border-white">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
