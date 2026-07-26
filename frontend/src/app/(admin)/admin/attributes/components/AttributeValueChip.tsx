"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { XIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import { deleteAttributeValueAction } from "@/actions/attributeActions";
import type { AttributeValue } from "@/services/attributeService";

interface AttributeValueChipProps {
  value: AttributeValue;
}

export function AttributeValueChip({ value }: AttributeValueChipProps) {
  const router = useRouter();
  const [isDeleting, startDeleting] = useTransition();

  const handleDelete = () => {
    startDeleting(async () => {
      const result = await deleteAttributeValueAction(value.id);

      if (result.success) {
        toast.success(result.message);

        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 py-1 pl-3 pr-1.5 text-sm text-gray-700">
      {value.value}

      <button
        onClick={handleDelete}
        disabled={isDeleting}
        title="Remove value"
        className="cursor-pointer rounded-full p-0.5 text-gray-400 transition-colors hover:bg-red-100 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <XIcon size={14} weight="bold" />
      </button>
    </span>
  );
}
