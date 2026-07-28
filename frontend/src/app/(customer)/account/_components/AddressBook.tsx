"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { PlusIcon, MapPinIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import { Button } from "@/components/ui";
import { setDefaultAddressAction } from "@/actions/addressActions";
import type { Address } from "@/services/addressService";
import { AddressCard } from "./AddressCard";
import { AddressFormModal } from "./AddressFormModal";
import { DeleteAddressDialog } from "./DeleteAddressDialog";

interface AddressBookProps {
  addresses: Address[];
}

export function AddressBook({ addresses }: AddressBookProps) {
  const router = useRouter();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [deletingAddress, setDeletingAddress] = useState<Address | null>(null);
  const [processingAddressId, setProcessingAddressId] = useState<number | null>(
    null,
  );
  const [isProcessing, startProcessing] = useTransition();

  const openCreateForm = () => {
    setEditingAddress(null);
    setIsFormOpen(true);
  };

  const openEditForm = (address: Address) => {
    setEditingAddress(address);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingAddress(null);
  };

  const handleSaved = () => {
    closeForm();
    router.refresh();
  };

  const handleDeleted = () => {
    setDeletingAddress(null);
    router.refresh();
  };

  const setDefaultAddress = (address: Address) => {
    setProcessingAddressId(address.id);
    startProcessing(async () => {
      const result = await setDefaultAddressAction(address.id);

      if (result.success) {
        toast.success(result.message);

        router.refresh();
      } else {
        toast.error(result.message);
      }

      setProcessingAddressId(null);
    });
  };

  return (
    <div className="glass overflow-hidden rounded-3xl shadow-xl shadow-indigo-500/10">
      <div className="flex items-center justify-between gap-3 border-b border-white/60 px-7 py-5">
        <div className="flex items-center gap-3">
          <span className="bg-brand-gradient h-9 w-1.5 rounded-full" />
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Saved Addresses
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Manage your shipping and billing addresses.
            </p>
          </div>
        </div>

        <Button size="sm" onClick={openCreateForm}>
          <PlusIcon size={16} weight="bold" />
          Add Address
        </Button>
      </div>

      <div className="px-7 py-6">
        {addresses.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gray-200 px-6 py-14 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-indigo-400">
              <MapPinIcon size={28} />
            </span>
            <p className="text-sm text-gray-500">
              No addresses saved yet. Add one for faster checkout.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {addresses.map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                isProcessing={
                  isProcessing && processingAddressId === address.id
                }
                onEdit={openEditForm}
                onDelete={setDeletingAddress}
                onSetDefault={setDefaultAddress}
              />
            ))}
          </div>
        )}
      </div>

      {isFormOpen && (
        <AddressFormModal
          address={editingAddress}
          onClose={closeForm}
          onSaved={handleSaved}
        />
      )}

      <DeleteAddressDialog
        address={deletingAddress}
        onClose={() => setDeletingAddress(null)}
        onDeleted={handleDeleted}
      />
    </div>
  );
}
