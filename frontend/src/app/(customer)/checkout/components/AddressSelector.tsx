"use client";

import Link from "next/link";
import { MapPinIcon, PlusIcon } from "@phosphor-icons/react";
import type { Address } from "@/services/addressService";

interface AddressSelectorProps {
  addresses: Address[];
  selectedAddressId: number | null;
  onSelect: (addressId: number) => void;
}

export function AddressSelector({
  addresses,
  selectedAddressId,
  onSelect,
}: AddressSelectorProps) {
  if (addresses.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-gray-200 px-6 py-10 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-400">
          <MapPinIcon size={24} />
        </span>
        <p className="text-sm text-gray-500">
          You have no saved addresses. Add one to continue.
        </p>
        <Link
          href="/account"
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
        >
          <PlusIcon size={16} weight="bold" />
          Add Address
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {addresses.map((address) => {
        const isSelected = address.id === selectedAddressId;

        return (
          <button
            key={address.id}
            type="button"
            onClick={() => onSelect(address.id)}
            className={`cursor-pointer rounded-2xl border p-4 text-left transition-all ${
              isSelected
                ? "border-indigo-500 bg-indigo-50/40 ring-1 ring-indigo-200"
                : "border-gray-200 bg-white hover:border-indigo-200"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="truncate font-semibold text-gray-900">
                {address.name}
              </p>
              {address.is_default && (
                <span className="shrink-0 rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] font-semibold text-white">
                  Default
                </span>
              )}
            </div>
            <p className="mt-1 text-xs text-gray-500">{address.phone}</p>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              {[
                address.address_line_1,
                address.address_line_2,
                [address.city, address.state].filter(Boolean).join(", "),
                address.zip_code,
              ]
                .filter(Boolean)
                .join(", ")}
            </p>
          </button>
        );
      })}
    </div>
  );
}
