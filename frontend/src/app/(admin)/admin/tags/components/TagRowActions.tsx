"use client";

import { TrashIcon } from "@phosphor-icons/react";
import type { Tag } from "@/services/catalogService";

interface TagRowActionsProps {
  tag: Tag;
  onDelete: (tag: Tag) => void;
}

export function TagRowActions({ tag, onDelete }: TagRowActionsProps) {
  return (
    <div className="flex items-center justify-end">
      <button
        onClick={() => onDelete(tag)}
        title="Delete tag"
        className="cursor-pointer rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
      >
        <TrashIcon size={20} />
      </button>
    </div>
  );
}
