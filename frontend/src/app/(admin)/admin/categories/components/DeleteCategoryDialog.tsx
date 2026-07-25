"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Button, Modal } from "@/components/ui";
import { deleteCategoryAction } from "@/actions/categoryActions";
import type { Category } from "@/services/catalogService";

interface DeleteCategoryDialogProps {
  category: Category | null;
  onClose: () => void;
  onDeleted: () => void;
}

export function DeleteCategoryDialog({
  category,
  onClose,
  onDeleted,
}: DeleteCategoryDialogProps) {
  const [isDeleting, startDeleting] = useTransition();

  const handleConfirm = () => {
    if (!category) {
      return;
    }
    const categoryId = category.id;
    startDeleting(async () => {
      const result = await deleteCategoryAction(categoryId);

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
      open={category !== null}
      onClose={onClose}
      size="sm"
      title="Delete Category"
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
        <span className="font-semibold text-gray-900">{category?.name}</span>?
        This action cannot be undone.
      </p>
    </Modal>
  );
}
