"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Button, Modal } from "@/components/ui";
import { deleteVariantAction } from "@/actions/variantActions";
import type { ProductVariant } from "@/services/productService";

interface DeleteVariantDialogProps {
  productId: number;
  variant: ProductVariant | null;
  onClose: () => void;
  onDeleted: () => void;
}

export function DeleteVariantDialog({
  productId,
  variant,
  onClose,
  onDeleted,
}: DeleteVariantDialogProps) {
  const [isDeleting, startDeleting] = useTransition();

  const handleConfirm = () => {
    if (!variant) {
      return;
    }

    const variantId = variant.id;

    startDeleting(async () => {
      const result = await deleteVariantAction(productId, variantId);

      if (result.success) {
        toast.success(result.message);

        onDeleted();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Modal
      open={variant !== null}
      onClose={onClose}
      size="sm"
      title="Delete Variant"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="secondary"
            onClick={handleConfirm}
            pending={isDeleting}
            pendingLabel="Deleting..."
          >
            Delete
          </Button>
        </>
      }
    >
      <p className="text-sm text-gray-600">
        Are you sure you want to delete this variant? This action cannot be
        undone.
      </p>
    </Modal>
  );
}
