"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusIcon } from "@phosphor-icons/react";
import { Button, DataTable, type Column } from "@/components/ui";
import { formatMoney } from "@/lib/productPricing";
import {
  formatWithdrawalMethod,
  formatAccountSummary,
  formatWithdrawalDate,
} from "@/lib/withdrawal";
import type { Withdrawal } from "@/services/withdrawalService";
import type { PaginationMeta } from "@/services/vendorProductService";
import { WithdrawalStatusBadge } from "@/components/shared/WithdrawalStatusBadge";
import { WithdrawalFormModal } from "./WithdrawalFormModal";

interface WithdrawalsTableProps {
  withdrawals: Withdrawal[];
  meta: PaginationMeta;
  balance: number;
}

export function WithdrawalsTable({
  withdrawals,
  meta,
  balance,
}: WithdrawalsTableProps) {
  const router = useRouter();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSaved = () => {
    setIsFormOpen(false);

    router.refresh();
  };

  const columns: Column<Withdrawal>[] = [
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
      cell: (withdrawal) => (
        <div className="space-y-1">
          <WithdrawalStatusBadge status={withdrawal.status} />
          {withdrawal.status === "rejected" && withdrawal.admin_note && (
            <p className="max-w-xs text-xs text-red-500">
              {withdrawal.admin_note}
            </p>
          )}
        </div>
      ),
    },
    {
      header: "Requested",
      cell: (withdrawal) => formatWithdrawalDate(withdrawal.created_at),
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={withdrawals}
        rowKey={(withdrawal) => withdrawal.id}
        title={`Withdrawal requests (${meta.total})`}
        emptyMessage="No withdrawal requests yet."
        meta={meta}
        toolbar={
          <Button
            size="sm"
            onClick={() => setIsFormOpen(true)}
            disabled={balance <= 0}
          >
            <PlusIcon size={16} weight="bold" />
            Request withdrawal
          </Button>
        }
      />

      {isFormOpen && (
        <WithdrawalFormModal
          balance={balance}
          onClose={() => setIsFormOpen(false)}
          onSaved={handleSaved}
        />
      )}
    </>
  );
}
