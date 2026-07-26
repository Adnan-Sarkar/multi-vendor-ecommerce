"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Button, Modal } from "@/components/ui";
import { deleteAttributeAction } from "@/actions/attributeActions";
import type { Attribute } from "@/services/attributeService";

interface DeleteAttributeDialogProps {
  attribute: Attribute | null;
  onClose: () => void;
  onDeleted: () => void;
}

export function DeleteAttributeDialog({
  attribute,
  onClose,
  onDeleted,
}: DeleteAttributeDialogProps) {
  const [isDeleting, startDeleting] = useTransition();

  const handleConfirm = () => {
    if (!attribute) {
      return;
    }

    const attributeId = attribute.id;

    startDeleting(async () => {
      const result = await deleteAttributeAction(attributeId);

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
      open={attribute !== null}
      onClose={onClose}
      size="sm"
      title="Delete Attribute"
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
        Are you sure you want to delete{" "}
        <span className="font-semibold text-gray-900">{attribute?.name}</span>{" "}
        and all of its values? This action cannot be undone.
      </p>
    </Modal>
  );
}
