"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Button, Modal } from "@/components/ui";
import { deleteTagAction } from "@/actions/tagActions";
import type { Tag } from "@/services/catalogService";

interface DeleteTagDialogProps {
  tag: Tag | null;
  onClose: () => void;
  onDeleted: () => void;
}

export function DeleteTagDialog({
  tag,
  onClose,
  onDeleted,
}: DeleteTagDialogProps) {
  const [isDeleting, startDeleting] = useTransition();

  const handleConfirm = () => {
    if (!tag) {
      return;
    }

    const tagId = tag.id;

    startDeleting(async () => {
      const result = await deleteTagAction(tagId);

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
      open={tag !== null}
      onClose={onClose}
      size="sm"
      title="Delete Tag"
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
        <span className="font-semibold text-gray-900">{tag?.name}</span>? This
        action cannot be undone.
      </p>
    </Modal>
  );
}
