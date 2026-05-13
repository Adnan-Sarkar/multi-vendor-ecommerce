"use client";

import { Product } from "@/data/mock/products";
import Image from "next/image";
import { PencilSimple, Trash } from "@phosphor-icons/react";

interface ProductsTableProps {
  products: Product[];
}

export function ProductsTable({ products }: ProductsTableProps) {
  const handleDelete = (id: number) => {
    // Note: We will replace this with a proper Server Action and UI modal later
    if (confirm("Are you sure you want to delete this product?")) {
      console.log("Delete product", id);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-600">
        <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
          <tr>
            <th className="px-6 py-4">Product</th>
            <th className="px-6 py-4">Category</th>
            <th className="px-6 py-4">Price</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image src={product.thumbnail} alt={product.name} fill className="object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 line-clamp-1">{product.name}</div>
                    <div className="text-xs text-gray-400">ID: {product.id}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 font-medium">{product.category}</td>
              <td className="px-6 py-4 font-bold text-gray-900">${product.price.toFixed(2)}</td>
              <td className="px-6 py-4">
                {product.in_stock ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                    In Stock
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                    Out of Stock
                  </span>
                )}
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                    <PencilSimple size={20} />
                  </button>
                  <button 
                    onClick={() => handleDelete(product.id)}
                    className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                No products found. Start by adding a new product.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
