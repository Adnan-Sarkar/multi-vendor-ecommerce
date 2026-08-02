"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button, Input, Modal } from "@/components/ui";
import { formatMoney } from "@/lib/productPricing";
import {
  requestWithdrawalAction,
  type WithdrawalFormState,
} from "@/actions/withdrawalActions";
import type { WithdrawalMethod } from "@/services/withdrawalService";

interface WithdrawalFormModalProps {
  balance: number;
  onClose: () => void;
  onSaved: () => void;
}

export function WithdrawalFormModal({
  balance,
  onClose,
  onSaved,
}: WithdrawalFormModalProps) {
  const [state, formAction, isPending] = useActionState<
    WithdrawalFormState | null,
    FormData
  >(requestWithdrawalAction, null);
  const [method, setMethod] = useState<WithdrawalMethod>("bank");

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);

      onSaved();
    } else if (state && !state.success) {
      toast.error(state.message);
    }
  }, [state, onSaved]);

  return (
    <Modal open onClose={onClose} size="lg" title="Request Withdrawal">
      <form action={formAction} className="space-y-5">
        <div className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-600">
          Available balance:{" "}
          <span className="font-semibold text-gray-900">
            {formatMoney(balance)}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="withdrawal-method"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Method
            </label>
            <select
              id="withdrawal-method"
              name="method"
              value={method}
              onChange={(event) =>
                setMethod(event.target.value as WithdrawalMethod)
              }
              className="w-full cursor-pointer rounded-xl border border-slate-200 bg-white/70 px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/15"
            >
              <option value="bank">Bank transfer</option>
              <option value="bkash">bKash</option>
            </select>
          </div>

          <Input
            label="Amount"
            name="amount"
            type="number"
            step="0.01"
            min="1"
            max={balance}
            placeholder="e.g., 100.00"
            error={state?.errors?.amount?.[0]}
          />

          <Input
            label={method === "bkash" ? "bKash number" : "Account number"}
            name="account_number"
            placeholder={
              method === "bkash" ? "e.g., 01700000000" : "e.g., 1234567890"
            }
            error={state?.errors?.["account_details.account_number"]?.[0]}
          />

          <Input
            label="Account holder name"
            name="account_name"
            placeholder="e.g., Abdur Rahman"
            error={state?.errors?.["account_details.account_name"]?.[0]}
          />

          {method === "bank" && (
            <>
              <Input
                label="Bank name"
                name="bank_name"
                placeholder="e.g., BRAC Bank"
                error={state?.errors?.["account_details.bank_name"]?.[0]}
              />

              <Input
                label="Branch name"
                name="branch_name"
                placeholder="e.g., Gulshan"
                error={state?.errors?.["account_details.branch_name"]?.[0]}
              />

              <Input
                label="Routing number"
                name="routing_number"
                placeholder="Optional"
                error={state?.errors?.["account_details.routing_number"]?.[0]}
              />
            </>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" pending={isPending} pendingLabel="Submitting...">
            Submit Request
          </Button>
        </div>
      </form>
    </Modal>
  );
}
