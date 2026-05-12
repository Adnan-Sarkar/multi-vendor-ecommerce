"use client";

import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { Product } from "@/data/mock/products";

interface AddToCartFormProps {
  product: Product;
}

export function AddToCartForm({ product }: AddToCartFormProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore(state => state.addItem);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addItem(product, quantity);
    // Note: For now we use a simple alert. Toast notifications will be added in the polish phase.
    alert('Added to cart successfully!'); 
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
      <button type="submit" className="flex-1 bg-blue-600 text-white rounded-lg px-6 py-3 font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg">
        Add to Cart - ${(product.price * quantity).toFixed(2)}
      </button>
    </form>
  );
}
