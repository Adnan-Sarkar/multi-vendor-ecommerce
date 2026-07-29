"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button, Input, Modal } from "@/components/ui";
import {
  createVendorCouponAction,
  type CouponFormState,
} from "@/actions/couponActions";

interface CouponFormModalProps {
  onClose: () => void;
  onSaved: () => void;
}

export function CouponFormModal({ onClose, onSaved }: CouponFormModalProps) {
  const [state, formAction, isPending] = useActionState<
    CouponFormState | null,
    FormData
  >(createVendorCouponAction, null);
  const [type, setType] = useState<"flat" | "percentage">("percentage");

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);

      onSaved();
    } else if (state && !state.success) {
      toast.error(state.message);
    }
  }, [state, onSaved]);

  return (
    <Modal open onClose={onClose} size="lg" title="Add Coupon">
      <form action={formAction} className="space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Code"
            name="code"
            placeholder="e.g., SUMMER20"
            error={state?.errors?.code?.[0]}
          />

          <div>
            <label
              htmlFor="coupon-type"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Type
            </label>
            <select
              id="coupon-type"
              name="type"
              value={type}
              onChange={(event) =>
                setType(event.target.value as "flat" | "percentage")
              }
              className="w-full cursor-pointer rounded-xl border border-slate-200 bg-white/70 px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/15"
            >
              <option value="percentage">Percentage (%)</option>
              <option value="flat">Flat amount</option>
            </select>
          </div>

          <Input
            label={type === "percentage" ? "Value (%)" : "Value (amount)"}
            name="value"
            type="number"
            step="0.01"
            min="0"
            placeholder={type === "percentage" ? "e.g., 20" : "e.g., 15.00"}
            error={state?.errors?.value?.[0]}
          />

          <Input
            label="Minimum order amount"
            name="min_order_amount"
            type="number"
            step="0.01"
            min="0"
            placeholder="Optional"
            error={state?.errors?.min_order_amount?.[0]}
          />

          {type === "percentage" && (
            <Input
              label="Maximum discount amount"
              name="max_discount_amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="Optional cap"
              error={state?.errors?.max_discount_amount?.[0]}
            />
          )}

          <Input
            label="Maximum uses (total)"
            name="max_uses"
            type="number"
            min="1"
            placeholder="Unlimited if empty"
            error={state?.errors?.max_uses?.[0]}
          />

          <Input
            label="Maximum uses per customer"
            name="max_uses_per_user"
            type="number"
            min="1"
            placeholder="1"
            error={state?.errors?.max_uses_per_user?.[0]}
          />

          <Input
            label="Starts at"
            name="starts_at"
            type="date"
            error={state?.errors?.starts_at?.[0]}
          />

          <Input
            label="Expires at"
            name="expires_at"
            type="date"
            error={state?.errors?.expires_at?.[0]}
          />
        </div>

        <label className="flex w-fit cursor-pointer items-center gap-2.5">
          <input
            type="checkbox"
            name="is_active"
            defaultChecked
            className="h-4 w-4 cursor-pointer rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="text-sm font-medium text-slate-700">Active</span>
        </label>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" pending={isPending} pendingLabel="Saving...">
            Create Coupon
          </Button>
        </div>
      </form>
    </Modal>
  );
}
