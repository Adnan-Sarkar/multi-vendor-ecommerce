"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Button, Modal } from "@/components/ui";
import type { Coupon } from "@/services/couponService";
import type { DeleteCouponResult } from "@/actions/couponActions";

interface DeleteCouponDialogProps {
  coupon: Coupon | null;
  onClose: () => void;
  onDeleted: () => void;
  deleteAction: (couponId: number) => Promise<DeleteCouponResult>;
}

export function DeleteCouponDialog({
  coupon,
  onClose,
  onDeleted,
  deleteAction,
}: DeleteCouponDialogProps) {
  const [isDeleting, startDeleting] = useTransition();

  const handleConfirm = () => {
    if (!coupon) {
      return;
    }

    const couponId = coupon.id;

    startDeleting(async () => {
      const result = await deleteAction(couponId);

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
      open={coupon !== null}
      onClose={onClose}
      size="sm"
      title="Delete Coupon"
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
        <span className="font-semibold text-gray-900">{coupon?.code}</span>? This
        action cannot be undone.
      </p>
    </Modal>
  );
}
