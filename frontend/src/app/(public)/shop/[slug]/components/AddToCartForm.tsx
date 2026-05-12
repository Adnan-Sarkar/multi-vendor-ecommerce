"use client";

import { useState } from "react";

interface AddToCartFormProps {
  productId: number;
  price: number;
}

export function AddToCartForm({ productId, price }: AddToCartFormProps) {
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Added product ${productId} (Qty: ${quantity}) to cart`);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex gap-4">
      <input 
        type="number" 
        min="1" 
        value={quantity} 
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="w-20 border border-gray-200 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button type="submit" className="flex-1 bg-blue-600 text-white rounded-lg px-6 py-3 font-semibold hover:bg-blue-700 transition-colors">
        Add to Cart - ${(price * quantity).toFixed(2)}
      </button>
    </form>
  );
}
