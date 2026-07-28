"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Button, Modal } from "@/components/ui";
import { deleteAddressAction } from "@/actions/addressActions";
import type { Address } from "@/services/addressService";

interface DeleteAddressDialogProps {
  address: Address | null;
  onClose: () => void;
  onDeleted: () => void;
}

export function DeleteAddressDialog({
  address,
  onClose,
  onDeleted,
}: DeleteAddressDialogProps) {
  const [isDeleting, startDeleting] = useTransition();

  const handleConfirm = () => {
    if (!address) {
      return;
    }

    const addressId = address.id;

    startDeleting(async () => {
      const result = await deleteAddressAction(addressId);

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
      open={address !== null}
      onClose={onClose}
      size="sm"
      title="Delete Address"
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
        Are you sure you want to delete the address for{" "}
        <span className="font-semibold text-gray-900">{address?.name}</span>?
        This action cannot be undone.
      </p>
    </Modal>
  );
}
