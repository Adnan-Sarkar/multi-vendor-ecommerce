"use client";

import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { useEffect, useState } from "react";

export function CartSummary() {
  const { getTotal, items } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || items.length === 0) return null;

  const subtotal = getTotal();
  const tax = subtotal * 0.05; // Fixed 5% mock tax
  const total = subtotal + tax;

  return (
    <div className="w-full lg:w-80 bg-gray-50 rounded-2xl p-6 border border-gray-100 flex-shrink-0 sticky top-24 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax (5%)</span>
          <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span className="font-medium text-gray-900">Calculated at checkout</span>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="font-bold text-gray-900">Total</span>
          <span className="text-2xl font-extrabold text-gray-900">${total.toFixed(2)}</span>
        </div>
      </div>

      <Link href="/checkout" className="block w-full text-center bg-indigo-600 text-white rounded-lg px-6 py-4 font-bold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl">
        Proceed to Checkout
      </Link>
    </div>
  );
}

