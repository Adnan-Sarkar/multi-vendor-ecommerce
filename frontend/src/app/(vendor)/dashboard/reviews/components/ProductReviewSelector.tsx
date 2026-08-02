"use client";

import { useRouter } from "next/navigation";

interface ProductOption {
  id: number;
  name: string;
}

interface ProductReviewSelectorProps {
  products: ProductOption[];
  selectedProductId: number;
}

export function ProductReviewSelector({
  products,
  selectedProductId,
}: ProductReviewSelectorProps) {
  const router = useRouter();

  return (
    <div>
      <label
        htmlFor="review-product"
        className="mb-1.5 block text-sm font-medium text-gray-700"
      >
        Select a product
      </label>
      <select
        id="review-product"
        value={selectedProductId}
        onChange={(event) =>
          router.push(`/dashboard/reviews?product=${event.target.value}`)
        }
        className="w-full max-w-md cursor-pointer rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15"
      >
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>
    </div>
  );
}
