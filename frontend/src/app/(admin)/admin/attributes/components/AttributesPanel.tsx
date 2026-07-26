"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { PlusIcon, SlidersHorizontalIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui";
import type { Attribute } from "@/services/attributeService";
import { AttributeCard } from "./AttributeCard";
import { AttributeFormModal } from "./AttributeFormModal";
import { DeleteAttributeDialog } from "./DeleteAttributeDialog";

interface AttributesPanelProps {
  attributes: Attribute[];
}

export function AttributesPanel({ attributes }: AttributesPanelProps) {
  const router = useRouter();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deletingAttribute, setDeletingAttribute] = useState<Attribute | null>(
    null,
  );

  const closeForm = useCallback(() => {
    setIsFormOpen(false);
  }, []);

  const handleSaved = useCallback(() => {
    setIsFormOpen(false);
    router.refresh();
  }, [router]);

  const handleDeleted = () => {
    setDeletingAttribute(null);
    router.refresh();
  };

  return (
    <>
      <div className="flex justify-end">
        <Button size="sm" onClick={() => setIsFormOpen(true)}>
          <PlusIcon size={16} weight="bold" />
          Add Attribute
        </Button>
      </div>

      {attributes.length === 0 ? (
        <div className="flex items-center gap-3 rounded-xl border border-dashed border-gray-200 px-6 py-12 text-gray-400">
          <SlidersHorizontalIcon size={32} />
          <p className="text-sm">No attributes yet. Create your first attribute.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {attributes.map((attribute) => (
            <AttributeCard
              key={attribute.id}
              attribute={attribute}
              onDelete={setDeletingAttribute}
            />
          ))}
        </div>
      )}

      {isFormOpen && (
        <AttributeFormModal onClose={closeForm} onSaved={handleSaved} />
      )}

      <DeleteAttributeDialog
        attribute={deletingAttribute}
        onClose={() => setDeletingAttribute(null)}
        onDeleted={handleDeleted}
      />
    </>
  );
}
