"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { EyeIcon, CheckCircleIcon } from "@phosphor-icons/react";
import { DataTable, type Column } from "@/components/ui";
import { formatMoney } from "@/lib/productPricing";
import {
  formatWithdrawalMethod,
  formatAccountSummary,
  formatWithdrawalDate,
} from "@/lib/withdrawal";
import type { Withdrawal } from "@/services/withdrawalService";
import type { PaginationMeta } from "@/services/vendorProductService";
import {
  approveWithdrawalAction,
  rejectWithdrawalAction,
} from "@/actions/withdrawalActions";
import { WithdrawalStatusBadge } from "@/components/shared/WithdrawalStatusBadge";
import { WithdrawalDetailModal } from "./WithdrawalDetailModal";

interface AdminWithdrawalsTableProps {
  withdrawals: Withdrawal[];
  meta: PaginationMeta;
}

export function AdminWithdrawalsTable({
  withdrawals,
  meta,
}: AdminWithdrawalsTableProps) {
  const router = useRouter();
  const [selectedWithdrawal, setSelectedWithdrawal] =
    useState<Withdrawal | null>(null);
  const [processingId, setProcessingId] = useState<number | null>(null);
  const [isProcessing, startProcessing] = useTransition();

  const approveWithdrawal = (withdrawalId: number) => {
    setProcessingId(withdrawalId);
    startProcessing(async () => {
      const result = await approveWithdrawalAction(withdrawalId);
      setProcessingId(null);

      if (result.success) {
        toast.success(result.message);
        setSelectedWithdrawal(null);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  const rejectWithdrawal = (withdrawalId: number, note: string) => {
    setProcessingId(withdrawalId);
    startProcessing(async () => {
      const result = await rejectWithdrawalAction(withdrawalId, note);
      setProcessingId(null);

      if (result.success) {
        toast.success(result.message);
        setSelectedWithdrawal(null);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  const isRowProcessing = (withdrawalId: number) =>
    isProcessing && processingId === withdrawalId;

  const columns: Column<Withdrawal>[] = [
    {
      header: "Vendor",
      cell: (withdrawal) =>
        withdrawal.vendor ? (
          <div className="min-w-0">
            <p className="truncate font-medium text-gray-900">
              {withdrawal.vendor.shop_name}
            </p>
            <p className="truncate text-xs text-gray-400">
              /{withdrawal.vendor.slug}
            </p>
          </div>
        ) : (
          "—"
        ),
    },
    {
      header: "Amount",
      cell: (withdrawal) => (
        <span className="font-semibold tabular-nums text-gray-900">
          {formatMoney(withdrawal.amount)}
        </span>
      ),
    },
    {
      header: "Method",
      cell: (withdrawal) => formatWithdrawalMethod(withdrawal.method),
    },
    {
      header: "Account",
      cell: (withdrawal) => (
        <span className="text-gray-600">
          {formatAccountSummary(withdrawal.account_details) || "—"}
        </span>
      ),
    },
    {
      header: "Status",
      cell: (withdrawal) => <WithdrawalStatusBadge status={withdrawal.status} />,
    },
    {
      header: "Requested",
      cell: (withdrawal) => formatWithdrawalDate(withdrawal.created_at),
    },
    {
      header: "Actions",
      align: "right",
      cell: (withdrawal) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => setSelectedWithdrawal(withdrawal)}
            title="View details"
            className="cursor-pointer rounded-lg p-2 text-gray-400 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
          >
            <EyeIcon size={20} />
          </button>
          {withdrawal.status === "pending" && (
            <button
              onClick={() => approveWithdrawal(withdrawal.id)}
              disabled={isRowProcessing(withdrawal.id)}
              title="Approve withdrawal"
              className="cursor-pointer rounded-lg p-2 text-gray-400 transition-colors hover:bg-green-50 hover:text-green-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CheckCircleIcon size={20} />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={withdrawals}
        rowKey={(withdrawal) => withdrawal.id}
        title={`Withdrawals (${meta.total})`}
        emptyMessage="No withdrawal requests found."
        meta={meta}
      />

      <WithdrawalDetailModal
        withdrawal={selectedWithdrawal}
        busy={
          selectedWithdrawal ? isRowProcessing(selectedWithdrawal.id) : false
        }
        onClose={() => setSelectedWithdrawal(null)}
        onApprove={approveWithdrawal}
        onReject={rejectWithdrawal}
      />
    </>
  );
}
