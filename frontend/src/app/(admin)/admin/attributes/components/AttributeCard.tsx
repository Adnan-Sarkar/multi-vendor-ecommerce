"use client";

import { TrashIcon } from "@phosphor-icons/react";
import type { Attribute } from "@/services/attributeService";
import { AttributeValueChip } from "./AttributeValueChip";
import { AddAttributeValueForm } from "./AddAttributeValueForm";

interface AttributeCardProps {
  attribute: Attribute;
  onDelete: (attribute: Attribute) => void;
}

export function AttributeCard({ attribute, onDelete }: AttributeCardProps) {
  const values = attribute.values ?? [];

  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-900">{attribute.name}</h2>

        <button
          onClick={() => onDelete(attribute)}
          title="Delete attribute"
          className="cursor-pointer rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <TrashIcon size={20} />
        </button>
      </div>

      {values.length > 0 ? (
        <div className="mb-4 flex flex-wrap gap-2">
          {values.map((value) => (
            <AttributeValueChip key={value.id} value={value} />
          ))}
        </div>
      ) : (
        <p className="mb-4 text-sm text-gray-400">No values yet.</p>
      )}

      <AddAttributeValueForm attributeId={attribute.id} />
    </div>
  );
}
