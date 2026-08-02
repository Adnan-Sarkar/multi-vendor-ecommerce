"use client";

import { useState } from "react";
import { StorefrontIcon } from "@phosphor-icons/react";
import { Button, Modal } from "@/components/ui";
import { formatMoney } from "@/lib/productPricing";
import {
  formatWithdrawalMethod,
  formatWithdrawalDate,
} from "@/lib/withdrawal";
import { WithdrawalStatusBadge } from "@/components/shared/WithdrawalStatusBadge";
import type { Withdrawal } from "@/services/withdrawalService";

interface WithdrawalDetailModalProps {
  withdrawal: Withdrawal | null;
  busy: boolean;
  onClose: () => void;
  onApprove: (id: number) => void;
  onReject: (id: number, note: string) => void;
}

function DetailRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </span>
      <span className="text-right text-sm font-medium text-gray-900">
        {value || "—"}
      </span>
    </div>
  );
}

export function WithdrawalDetailModal({
  withdrawal,
  busy,
  onClose,
  onApprove,
  onReject,
}: WithdrawalDetailModalProps) {
  const [rejecting, setRejecting] = useState(false);
  const [note, setNote] = useState("");

  if (!withdrawal) return null;

  const details = withdrawal.account_details;
  const isPending = withdrawal.status === "pending";

  const handleClose = () => {
    setRejecting(false);
    setNote("");
    onClose();
  };

  const readOnlyFooter = (
    <Button variant="outline" onClick={handleClose}>
      Close
    </Button>
  );

  const actionFooter = rejecting ? (
    <>
      <Button variant="ghost" onClick={() => setRejecting(false)} disabled={busy}>
        Cancel
      </Button>
      <Button
        variant="secondary"
        className="bg-red-600! hover:bg-red-700!"
        pending={busy}
        pendingLabel="Rejecting..."
        disabled={note.trim().length < 5}
        onClick={() => onReject(withdrawal.id, note.trim())}
      >
        Confirm Rejection
      </Button>
    </>
  ) : (
    <>
      <Button variant="outline" onClick={() => setRejecting(true)} disabled={busy}>
        Reject
      </Button>
      <Button
        pending={busy}
        pendingLabel="Approving..."
        onClick={() => onApprove(withdrawal.id)}
      >
        Approve Withdrawal
      </Button>
    </>
  );

  return (
    <Modal
      open={!!withdrawal}
      onClose={handleClose}
      title="Withdrawal Request"
      footer={isPending ? actionFooter : readOnlyFooter}
      size="lg"
    >
      <div className="mb-5 flex items-center gap-3 rounded-xl border border-gray-200 p-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-50 text-indigo-500">
          <StorefrontIcon size={22} />
        </span>
        <div className="min-w-0">
          <p className="truncate font-semibold text-gray-900">
            {withdrawal.vendor?.shop_name ?? "—"}
          </p>
          {withdrawal.vendor?.slug && (
            <p className="truncate text-xs text-gray-400">
              /{withdrawal.vendor.slug}
            </p>
          )}
        </div>
        <div className="ml-auto text-right">
          <span className="block text-xl font-bold text-gray-900">
            {formatMoney(withdrawal.amount)}
          </span>
          <span className="mt-1 inline-block">
            <WithdrawalStatusBadge status={withdrawal.status} />
          </span>
        </div>
      </div>

      <div className="divide-y divide-gray-100 rounded-xl border border-gray-200 px-4">
        <DetailRow
          label="Method"
          value={formatWithdrawalMethod(withdrawal.method)}
        />
        <DetailRow label="Account name" value={details.account_name} />
        <DetailRow label="Account number" value={details.account_number} />
        {withdrawal.method === "bank" && (
          <>
            <DetailRow label="Bank name" value={details.bank_name} />
            <DetailRow label="Branch name" value={details.branch_name} />
            <DetailRow label="Routing number" value={details.routing_number} />
          </>
        )}
        <DetailRow
          label="Requested"
          value={formatWithdrawalDate(withdrawal.created_at)}
        />
        {!isPending && withdrawal.processed_at && (
          <DetailRow
            label="Processed"
            value={formatWithdrawalDate(withdrawal.processed_at)}
          />
        )}
      </div>

      {withdrawal.status === "rejected" && withdrawal.admin_note && (
        <div className="mt-5 rounded-xl border border-red-100 bg-red-50 p-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-red-500">
            Rejection reason
          </p>
          <p className="text-sm text-red-700">{withdrawal.admin_note}</p>
        </div>
      )}

      {rejecting && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4">
          <label className="mb-1.5 block text-sm font-semibold text-red-800">
            Rejection reason
          </label>
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            rows={3}
            placeholder="Explain why this request is being rejected (min 5 characters)…"
            className="w-full resize-none rounded-lg border border-red-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-200"
          />
        </div>
      )}
    </Modal>
  );
}
