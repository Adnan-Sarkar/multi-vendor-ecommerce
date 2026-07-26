"use server";

import { revalidatePath } from "next/cache";
import { fetchServer } from "@/lib/api-server";

export interface TagFormState {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export interface DeleteTagResult {
  success: boolean;
  message: string;
}

function readText(formData: FormData, field: string): string {
  return String(formData.get(field) ?? "").trim();
}

export async function createTagAction(
  _previousState: TagFormState | null,
  formData: FormData,
): Promise<TagFormState> {
  const payload = {
    name: readText(formData, "name"),
  };

  const response = await fetchServer("/tag", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    return {
      success: false,
      message: body?.message ?? "Failed to create tag.",
      errors: body?.errors,
    };
  }

  revalidatePath("/admin/tags");
  return {
    success: true,
    message: body?.message ?? "Tag created successfully.",
  };
}

export async function deleteTagAction(tagId: number): Promise<DeleteTagResult> {
  const response = await fetchServer(`/tag/${tagId}`, {
    method: "DELETE",
  });

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    return {
      success: false,
      message: body?.message ?? "Failed to delete tag.",
    };
  }

  revalidatePath("/admin/tags");
  return {
    success: true,
    message: body?.message ?? "Tag deleted successfully.",
  };
}
