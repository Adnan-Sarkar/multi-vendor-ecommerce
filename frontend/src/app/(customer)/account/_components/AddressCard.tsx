"use client";

import {
  MapPinIcon,
  PencilSimpleIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@phosphor-icons/react";
import type { Address } from "@/services/addressService";

interface AddressCardProps {
  address: Address;
  isProcessing: boolean;
  onEdit: (address: Address) => void;
  onDelete: (address: Address) => void;
  onSetDefault: (address: Address) => void;
}

export function AddressCard({
  address,
  isProcessing,
  onEdit,
  onDelete,
  onSetDefault,
}: AddressCardProps) {
  const fullAddress = [
    address.address_line_1,
    address.address_line_2,
    [address.city, address.state].filter(Boolean).join(", "),
    address.zip_code,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div
      className={`flex flex-col rounded-2xl border p-5 transition-all ${
        address.is_default
          ? "border-indigo-300 bg-indigo-50/40 ring-1 ring-indigo-100"
          : "border-gray-200 bg-white hover:border-indigo-200 hover:shadow-md"
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
            <MapPinIcon size={18} weight="fill" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-bold text-gray-900">{address.name}</p>
            <p className="text-xs text-gray-500">{address.phone}</p>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5">
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium capitalize text-gray-600">
            {address.type}
          </span>
          {address.is_default && (
            <span className="rounded-full bg-indigo-600 px-2.5 py-0.5 text-xs font-semibold text-white">
              Default
            </span>
          )}
        </div>
      </div>

      <p className="text-sm leading-relaxed text-gray-600">{fullAddress}</p>

      <div className="mt-4 flex items-center justify-between gap-2 border-t border-gray-100 pt-3">
        {address.is_default ? (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600">
            <CheckCircleIcon size={15} weight="fill" />
            Default address
          </span>
        ) : (
          <button
            onClick={() => onSetDefault(address)}
            disabled={isProcessing}
            className="cursor-pointer text-xs font-semibold text-indigo-600 transition-colors hover:text-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Set as default
          </button>
        )}

        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(address)}
            title="Edit address"
            className="cursor-pointer rounded-lg p-2 text-gray-400 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
          >
            <PencilSimpleIcon size={18} />
          </button>
          <button
            onClick={() => onDelete(address)}
            title="Delete address"
            className="cursor-pointer rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <TrashIcon size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
