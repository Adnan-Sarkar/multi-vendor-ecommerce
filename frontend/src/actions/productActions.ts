"use server";

import { revalidatePath } from "next/cache";
import { fetchServer } from "@/lib/api-server";

export interface ProductFormState {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  productId?: number;
}

export interface DeleteProductResult {
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

function readNumber(formData: FormData, field: string): number | undefined {
  const value = readText(formData, field);
  if (value === "") return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
}

function readIdList(formData: FormData, field: string): number[] {
  return formData
    .getAll(field)
    .map((value) => Number(value))
    .filter((value) => !Number.isNaN(value));
}

function readCheckbox(formData: FormData, field: string): boolean {
  return formData.get(field) !== null;
}

function buildPayload(formData: FormData) {
  return {
    name: readText(formData, "name"),
    short_description: readText(formData, "short_description"),
    description: readOptionalText(formData, "description"),
    categories: readIdList(formData, "categories"),
    tags: readIdList(formData, "tags"),
    thumbnail: readOptionalText(formData, "thumbnail"),
    regular_price: readNumber(formData, "regular_price"),
    sale_price: readNumber(formData, "sale_price"),
    stock_qty: readNumber(formData, "stock_qty"),
    low_stock_threshold: readNumber(formData, "low_stock_threshold"),
    manage_stock: readCheckbox(formData, "manage_stock"),
    in_stock: readCheckbox(formData, "in_stock"),
    weight: readNumber(formData, "weight"),
  };
}

export async function createProductAction(
  _previousState: ProductFormState | null,
  formData: FormData,
): Promise<ProductFormState> {
  const payload = buildPayload(formData);

  const response = await fetchServer("/product", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  const body = await response.json().catch(() => null);

  if (!response.ok) {
    return {
      success: false,
      message: body?.message ?? "Failed to create product.",
      errors: body?.errors,
    };
  }

  revalidatePath("/dashboard/products");
  return {
    success: true,
    message: body?.message ?? "Product created successfully.",
    productId: body?.data?.id,
  };
}

export async function updateProductAction(
  productId: number,
  _previousState: ProductFormState | null,
  formData: FormData,
): Promise<ProductFormState> {
  const payload = buildPayload(formData);

  const response = await fetchServer(`/product/${productId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
  const body = await response.json().catch(() => null);

  if (!response.ok) {
    return {
      success: false,
      message: body?.message ?? "Failed to update product.",
      errors: body?.errors,
    };
  }

  revalidatePath("/dashboard/products");
  revalidatePath(`/dashboard/products/${productId}`);
  return {
    success: true,
    message: body?.message ?? "Product updated successfully.",
    productId,
  };
}

export async function deleteProductAction(
  productId: number,
): Promise<DeleteProductResult> {
  const response = await fetchServer(`/product/${productId}`, { method: "DELETE" });
  const body = await response.json().catch(() => null);

  if (!response.ok) {
    return { success: false, message: body?.message ?? "Failed to delete product." };
  }

  revalidatePath("/dashboard/products");
  return { success: true, message: body?.message ?? "Product deleted successfully." };
}
