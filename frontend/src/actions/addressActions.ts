"use server";

import { revalidatePath } from "next/cache";
import { fetchServer } from "@/lib/api-server";

export interface AddressFormState {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export interface AddressMutationResult {
  success: boolean;
  message: string;
}

function readText(formData: FormData, field: string): string {
  return String(formData.get(field) ?? "").trim();
}

function readOptionalText(
  formData: FormData,
  field: string,
): string | undefined {
  const value = readText(formData, field);
  return value === "" ? undefined : value;
}

function readCheckbox(formData: FormData, field: string): boolean {
  return formData.get(field) !== null;
}

function buildPayload(formData: FormData) {
  return {
    name: readText(formData, "name"),
    phone: readText(formData, "phone"),
    address_line_1: readText(formData, "address_line_1"),
    address_line_2: readOptionalText(formData, "address_line_2"),
    city: readText(formData, "city"),
    state: readText(formData, "state"),
    zip_code: readOptionalText(formData, "zip_code"),
    is_default: readCheckbox(formData, "is_default"),
    type: readText(formData, "type"),
  };
}

export async function createAddressAction(
  _previousState: AddressFormState | null,
  formData: FormData,
): Promise<AddressFormState> {
  const payload = buildPayload(formData);

  const response = await fetchServer("/address", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    return {
      success: false,
      message: body?.message ?? "Failed to add address.",
      errors: body?.errors,
    };
  }

  revalidatePath("/account");

  return {
    success: true,
    message: body?.message ?? "Address added successfully.",
  };
}

export async function updateAddressAction(
  addressId: number,
  _previousState: AddressFormState | null,
  formData: FormData,
): Promise<AddressFormState> {
  const payload = buildPayload(formData);

  const response = await fetchServer(`/address/${addressId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    return {
      success: false,
      message: body?.message ?? "Failed to update address.",
      errors: body?.errors,
    };
  }

  revalidatePath("/account");

  return {
    success: true,
    message: body?.message ?? "Address updated successfully.",
  };
}

export async function deleteAddressAction(
  addressId: number,
): Promise<AddressMutationResult> {
  const response = await fetchServer(`/address/${addressId}`, {
    method: "DELETE",
  });

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    return {
      success: false,
      message: body?.message ?? "Failed to delete address.",
    };
  }

  revalidatePath("/account");

  return {
    success: true,
    message: body?.message ?? "Address deleted successfully.",
  };
}

export async function setDefaultAddressAction(
  addressId: number,
): Promise<AddressMutationResult> {
  const response = await fetchServer(`/address/${addressId}/set-default`, {
    method: "PATCH",
  });

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    return {
      success: false,
      message: body?.message ?? "Failed to set default address.",
    };
  }

  revalidatePath("/account");

  return {
    success: true,
    message: body?.message ?? "Default address updated.",
  };
}
