"use server";

import { revalidatePath } from "next/cache";
import { fetchServer } from "@/lib/api-server";

export interface AttributeFormState {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export interface AttributeMutationResult {
  success: boolean;
  message: string;
}

function readText(formData: FormData, field: string): string {
  return String(formData.get(field) ?? "").trim();
}

export async function createAttributeAction(
  _previousState: AttributeFormState | null,
  formData: FormData,
): Promise<AttributeFormState> {
  const payload = {
    name: readText(formData, "name"),
  };

  const response = await fetchServer("/attribute", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    return {
      success: false,
      message: body?.message ?? "Failed to create attribute.",
      errors: body?.errors,
    };
  }

  revalidatePath("/admin/attributes");

  return {
    success: true,
    message: body?.message ?? "Attribute created successfully.",
  };
}

export async function createAttributeValueAction(
  attributeId: number,
  _previousState: AttributeFormState | null,
  formData: FormData,
): Promise<AttributeFormState> {
  const payload = {
    value: readText(formData, "value"),
  };

  const response = await fetchServer(`/attribute/${attributeId}/values`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    return {
      success: false,
      message: body?.message ?? "Failed to add value.",
      errors: body?.errors,
    };
  }

  revalidatePath("/admin/attributes");

  return {
    success: true,
    message: body?.message ?? "Value added successfully.",
  };
}

export async function deleteAttributeAction(
  attributeId: number,
): Promise<AttributeMutationResult> {
  const response = await fetchServer(`/attribute/${attributeId}`, {
    method: "DELETE",
  });

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    return {
      success: false,
      message: body?.message ?? "Failed to delete attribute.",
    };
  }

  revalidatePath("/admin/attributes");

  return {
    success: true,
    message: body?.message ?? "Attribute deleted successfully.",
  };
}

export async function deleteAttributeValueAction(
  valueId: number,
): Promise<AttributeMutationResult> {
  const response = await fetchServer(`/attribute/values/${valueId}`, {
    method: "DELETE",
  });

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    return {
      success: false,
      message: body?.message ?? "Failed to delete value.",
    };
  }

  revalidatePath("/admin/attributes");

  return {
    success: true,
    message: body?.message ?? "Value deleted successfully.",
  };
}
