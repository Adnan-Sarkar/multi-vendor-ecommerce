"use server";

import { revalidatePath } from "next/cache";
import { fetchServer } from "@/lib/api-server";

export interface CategoryFormState {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export interface DeleteCategoryResult {
  success: boolean;
  message: string;
}

function readText(formData: FormData, field: string): string {
  return String(formData.get(field) ?? "").trim();
}

function readOptionalText(formData: FormData, field: string): string | undefined {
  const value = readText(formData, field);
  return value === "" ? undefined : value;
}

function readParentId(formData: FormData): number | null {
  const value = readText(formData, "parent_id");
  if (value === "") {
    return null;
  }
  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
}

function readCheckbox(formData: FormData, field: string): boolean {
  return formData.get(field) !== null;
}

function buildPayload(formData: FormData) {
  return {
    name: readText(formData, "name"),
    description: readText(formData, "description"),
    image: readOptionalText(formData, "image"),
    parent_id: readParentId(formData),
    is_active: readCheckbox(formData, "is_active"),
  };
}

export async function createCategoryAction(
  _previousState: CategoryFormState | null,
  formData: FormData,
): Promise<CategoryFormState> {
  const payload = buildPayload(formData);

  const response = await fetchServer("/category", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  const body = await response.json().catch(() => null);

  if (!response.ok) {
    return {
      success: false,
      message: body?.message ?? "Failed to create category.",
      errors: body?.errors,
    };
  }

  revalidatePath("/admin/categories");
  return {
    success: true,
    message: body?.message ?? "Category created successfully.",
  };
}

export async function updateCategoryAction(
  categoryId: number,
  _previousState: CategoryFormState | null,
  formData: FormData,
): Promise<CategoryFormState> {
  const payload = buildPayload(formData);

  const response = await fetchServer(`/category/${categoryId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
  const body = await response.json().catch(() => null);

  if (!response.ok) {
    return {
      success: false,
      message: body?.message ?? "Failed to update category.",
      errors: body?.errors,
    };
  }

  revalidatePath("/admin/categories");
  return {
    success: true,
    message: body?.message ?? "Category updated successfully.",
  };
}

export async function deleteCategoryAction(
  categoryId: number,
): Promise<DeleteCategoryResult> {
  const response = await fetchServer(`/category/${categoryId}`, {
    method: "DELETE",
  });
  const body = await response.json().catch(() => null);

  if (!response.ok) {
    return {
      success: false,
      message: body?.message ?? "Failed to delete category.",
    };
  }

  revalidatePath("/admin/categories");
  return {
    success: true,
    message: body?.message ?? "Category deleted successfully.",
  };
}
