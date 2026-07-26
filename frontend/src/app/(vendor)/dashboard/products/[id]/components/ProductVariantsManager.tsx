"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui";
import type { Attribute } from "@/services/attributeService";
import type { ProductVariant } from "@/services/productService";
import { VariantRow } from "./VariantRow";
import { VariantForm } from "./VariantForm";
import { DeleteVariantDialog } from "./DeleteVariantDialog";

interface ProductVariantsManagerProps {
  productId: number;
  variants: ProductVariant[];
  attributes: Attribute[];
}

export function ProductVariantsManager({
  productId,
  variants,
  attributes,
}: ProductVariantsManagerProps) {
  const router = useRouter();
  const [isAddingVariant, setIsAddingVariant] = useState(false);
  const [editingVariant, setEditingVariant] = useState<ProductVariant | null>(
    null,
  );
  const [deletingVariant, setDeletingVariant] = useState<ProductVariant | null>(
    null,
  );

  const closeForm = () => {
    setIsAddingVariant(false);
    setEditingVariant(null);
  };

  const handleDone = () => {
    closeForm();
    router.refresh();
  };

  const handleDeleted = () => {
    setDeletingVariant(null);
    router.refresh();
  };

  const isFormOpen = isAddingVariant || editingVariant !== null;

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-900">Variants</h2>

        {!isFormOpen && attributes.length > 0 && (
          <Button size="sm" onClick={() => setIsAddingVariant(true)}>
            <PlusIcon size={16} weight="bold" />
            Add Variant
          </Button>
        )}
      </div>

      {attributes.length === 0 ? (
        <p className="text-sm text-gray-400">
          No attributes available yet. An admin must create attributes before
          variants can be added.
        </p>
      ) : (
        <div className="space-y-4">
          {variants.length > 0 && (
            <div className="space-y-3">
              {variants.map((variant) => (
                <VariantRow
                  key={variant.id}
                  variant={variant}
                  onEdit={setEditingVariant}
                  onDelete={setDeletingVariant}
                />
              ))}
            </div>
          )}

          {variants.length === 0 && !isFormOpen && (
            <p className="text-sm text-gray-400">
              No variants yet. Add one to offer options like size or color.
            </p>
          )}

          {isFormOpen && (
            <VariantForm
              productId={productId}
              attributes={attributes}
              initialVariant={editingVariant ?? undefined}
              onDone={handleDone}
              onCancel={closeForm}
            />
          )}
        </div>
      )}

      <DeleteVariantDialog
        productId={productId}
        variant={deletingVariant}
        onClose={() => setDeletingVariant(null)}
        onDeleted={handleDeleted}
      />
    </section>
  );
}
