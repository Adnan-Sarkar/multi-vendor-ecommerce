"use client";

import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import { useEffect, useState } from "react";

export function CheckoutSummary() {
  const { items, getTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-64 bg-gray-50 rounded-2xl animate-pulse" />;
  if (items.length === 0) return <div className="text-gray-500">Your cart is empty.</div>;

  const subtotal = getTotal();
  const tax = subtotal * 0.05;
  const shipping = 10.00; // Mock fixed shipping cost
  const total = subtotal + tax + shipping;

  return (
    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 sticky top-24">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>
      
      <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
        {items.map((item) => (
          <div key={item.product.id} className="flex gap-4">
            <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-white border border-gray-100 flex-shrink-0">
              <Image src={item.product.thumbnail} alt={item.product.name} fill className="object-cover" />
              <div className="absolute -top-2 -right-2 h-5 w-5 bg-gray-500 rounded-full text-xs text-white flex items-center justify-center font-bold">
                {item.quantity}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">{item.product.name}</h3>
              <p className="text-gray-500 text-xs">{item.product.category}</p>
              <div className="font-bold text-gray-900 text-sm mt-1">${(item.product.price * item.quantity).toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 border-t border-gray-200 pt-4 mb-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Shipping</span>
          <span className="font-medium text-gray-900">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Tax</span>
          <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between items-center">
          <span className="font-bold text-gray-900">Total</span>
          <span className="text-2xl font-extrabold text-gray-900">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
