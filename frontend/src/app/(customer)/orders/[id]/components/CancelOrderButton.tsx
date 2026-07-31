"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { XCircleIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import { Button, Modal } from "@/components/ui";
import { cancelOrderAction } from "@/actions/orderActions";

interface CancelOrderButtonProps {
  orderId: number;
}

export function CancelOrderButton({ orderId }: CancelOrderButtonProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [isCancelling, startCancelling] = useTransition();

  const confirmCancel = () => {
    const trimmedReason = reason.trim();

    if (trimmedReason.length < 10) {
      toast.error("Please provide a reason of at least 10 characters.");
      return;
    }

    startCancelling(async () => {
      const result = await cancelOrderAction(orderId, trimmedReason);

      if (result.success) {
        toast.success(result.message);
        setIsOpen(false);
        setReason("");
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
      >
        <XCircleIcon size={18} />
        Cancel order
      </button>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        size="sm"
        title="Cancel Order"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Keep order
            </Button>
            <Button
              variant="secondary"
              onClick={confirmCancel}
              pending={isCancelling}
              pendingLabel="Cancelling..."
            >
              Cancel order
            </Button>
          </>
        }
      >
        <p className="mb-3 text-sm text-gray-600">
          Tell us why you are cancelling this order. Your items will be restocked.
        </p>
        <textarea
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          rows={3}
          placeholder="Reason for cancellation (at least 10 characters)"
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/15"
        />
      </Modal>
    </>
  );
}
