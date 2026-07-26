"use client";

import Image from "next/image";
import {
  PackageIcon,
  PencilSimpleIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { formatMoney } from "@/lib/productPricing";
import type { ProductVariant } from "@/services/productService";

interface VariantRowProps {
  variant: ProductVariant;
  onEdit: (variant: ProductVariant) => void;
  onDelete: (variant: ProductVariant) => void;
}

export function VariantRow({ variant, onEdit, onDelete }: VariantRowProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100 text-gray-400">
        {variant.image ? (
          <Image
            src={variant.image}
            alt=""
            width={56}
            height={56}
            className="h-full w-full object-cover"
          />
        ) : (
          <PackageIcon size={22} />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap gap-1.5">
          {(variant.attribute_values ?? []).map((attributeValue) => (
            <span
              key={attributeValue.id}
              className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700"
            >
              {attributeValue.value}
            </span>
          ))}
        </div>
        <p className="mt-1.5 text-xs text-gray-400">{variant.sku}</p>
      </div>

      <div className="text-right">
        <p className="font-bold text-gray-900">{formatMoney(variant.price)}</p>
        <p className="text-xs text-gray-500">{variant.stock_qty} in stock</p>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onEdit(variant)}
          title="Edit variant"
          className="cursor-pointer rounded-lg p-2 text-gray-400 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
        >
          <PencilSimpleIcon size={18} />
        </button>
        <button
          onClick={() => onDelete(variant)}
          title="Delete variant"
          className="cursor-pointer rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <TrashIcon size={18} />
        </button>
      </div>
    </div>
  );
}
