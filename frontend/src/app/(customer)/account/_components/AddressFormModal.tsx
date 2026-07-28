"use client";

import { useActionState, useEffect } from "react";
import { UserIcon, PhoneIcon, MapPinIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import { Button, Input, Modal } from "@/components/ui";
import {
  createAddressAction,
  updateAddressAction,
  type AddressFormState,
} from "@/actions/addressActions";
import type { Address } from "@/services/addressService";

interface AddressFormModalProps {
  address: Address | null;
  onClose: () => void;
  onSaved: () => void;
}

export function AddressFormModal({
  address,
  onClose,
  onSaved,
}: AddressFormModalProps) {
  const isEditing = address !== null;

  const action = isEditing
    ? updateAddressAction.bind(null, address.id)
    : createAddressAction;

  const [state, formAction, isPending] = useActionState<
    AddressFormState | null,
    FormData
  >(action, null);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);

      onSaved();
    } else if (state && !state.success) {
      toast.error(state.message);
    }
  }, [state, onSaved]);

  return (
    <Modal
      open
      onClose={onClose}
      size="lg"
      title={isEditing ? "Edit Address" : "Add Address"}
    >
      <form action={formAction} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input
            label="Full Name"
            icon={UserIcon}
            name="name"
            defaultValue={address?.name ?? ""}
            placeholder="Recipient name"
            error={state?.errors?.name?.[0]}
          />
          <Input
            label="Phone Number"
            icon={PhoneIcon}
            name="phone"
            type="tel"
            defaultValue={address?.phone ?? ""}
            placeholder="01XXXXXXXXX"
            error={state?.errors?.phone?.[0]}
          />
        </div>

        <Input
          label="Address Line 1"
          icon={MapPinIcon}
          name="address_line_1"
          defaultValue={address?.address_line_1 ?? ""}
          placeholder="House, road, area"
          error={state?.errors?.address_line_1?.[0]}
        />

        <Input
          label="Address Line 2 (optional)"
          name="address_line_2"
          defaultValue={address?.address_line_2 ?? ""}
          placeholder="Apartment, suite, landmark"
          error={state?.errors?.address_line_2?.[0]}
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <Input
            label="City"
            name="city"
            defaultValue={address?.city ?? ""}
            placeholder="City"
            error={state?.errors?.city?.[0]}
          />
          <Input
            label="State"
            name="state"
            defaultValue={address?.state ?? ""}
            placeholder="State"
            error={state?.errors?.state?.[0]}
          />
          <Input
            label="ZIP Code (optional)"
            name="zip_code"
            defaultValue={address?.zip_code ?? ""}
            placeholder="ZIP"
            error={state?.errors?.zip_code?.[0]}
          />
        </div>

        <div>
          <label
            htmlFor="type"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Address Type
          </label>
          <select
            id="type"
            name="type"
            defaultValue={address?.type ?? "shipping"}
            className="w-full cursor-pointer rounded-xl border border-slate-200 bg-white/70 px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/15"
          >
            <option value="shipping">Shipping</option>
            <option value="billing">Billing</option>
          </select>
          {state?.errors?.type?.[0] && (
            <p className="mt-1.5 text-xs font-medium text-red-500">
              {state.errors.type[0]}
            </p>
          )}
        </div>

        <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            name="is_default"
            defaultChecked={address ? address.is_default : false}
            className="h-4 w-4 cursor-pointer rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
          Set as default address
        </label>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" pending={isPending} pendingLabel="Saving...">
            {isEditing ? "Save Changes" : "Add Address"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
