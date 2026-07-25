"use client";

import { PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react";
import type { Category } from "@/services/catalogService";

interface CategoryRowActionsProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export function CategoryRowActions({
  category,
  onEdit,
  onDelete,
}: CategoryRowActionsProps) {
  return (
    <div className="flex items-center justify-end gap-1.5">
      <button
        onClick={() => onEdit(category)}
        title="Edit category"
        className="cursor-pointer rounded-lg p-2 text-gray-400 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
      >
        <PencilSimpleIcon size={20} />
      </button>
      <button
        onClick={() => onDelete(category)}
        title="Delete category"
        className="cursor-pointer rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
      >
        <TrashIcon size={20} />
      </button>
    </div>
  );
}
