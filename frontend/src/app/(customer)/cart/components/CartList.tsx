"use client";

import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import Link from "next/link";
import { Trash } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

export function CartList() {
  const { items, updateQuantity, removeItem } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="flex-1 min-h-[200px] flex items-center justify-center bg-gray-50 rounded-2xl animate-pulse" />;
  }

  if (items.length === 0) {
    return (
      <div className="flex-1 py-12 text-center bg-gray-50 rounded-2xl border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
        <Link href="/shop" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-6">
      {items.map((item) => (
        <div key={item.product.id} className="flex items-center gap-6 p-4 border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow transition-shadow">
          <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
            <Image src={item.product.thumbnail} alt={item.product.name} fill className="object-cover" />
          </div>
          <div className="flex-1">
            <Link href={`/shop/${item.product.slug}`}>
              <h3 className="font-bold text-gray-900 hover:text-blue-600 transition-colors">{item.product.name}</h3>
            </Link>
            <div className="text-sm text-gray-500 mb-2">{item.product.category}</div>
            <div className="font-extrabold text-gray-900">${item.product.price}</div>
          </div>
          <div className="flex items-center gap-4">
            <input 
              type="number" 
              min="1" 
              value={item.quantity} 
              onChange={(e) => updateQuantity(item.product.id, Number(e.target.value))}
              className="w-16 border border-gray-200 rounded-lg px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={() => removeItem(item.product.id)}
              className="text-gray-400 hover:text-red-600 transition-colors p-2"
            >
              <Trash size={20} weight="bold" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
