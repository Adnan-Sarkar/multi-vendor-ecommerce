"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button, ImageUpload, Input, Modal, Textarea } from "@/components/ui";
import {
  createCategoryAction,
  updateCategoryAction,
  type CategoryFormState,
} from "@/actions/categoryActions";
import type { Category } from "@/services/catalogService";

interface CategoryFormModalProps {
  onClose: () => void;
  onSaved: () => void;
  category: Category | null;
  parentOptions: Category[];
}

export function CategoryFormModal({
  onClose,
  onSaved,
  category,
  parentOptions,
}: CategoryFormModalProps) {
  const isEditing = category !== null;

  const action = isEditing
    ? updateCategoryAction.bind(null, category.id)
    : createCategoryAction;

  const [state, formAction, isPending] = useActionState<
    CategoryFormState | null,
    FormData
  >(action, null);
  const [isImageUploading, setIsImageUploading] = useState(false);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      onSaved();
    } else if (state && !state.success) {
      toast.error(state.message);
    }
  }, [state, onSaved]);

  const availableParents = parentOptions.filter(
    (parent) => parent.id !== category?.id,
  );

  return (
    <Modal
      open
      onClose={onClose}
      size="lg"
      title={isEditing ? "Edit Category" : "Add Category"}
    >
      <form action={formAction} className="space-y-5">
        <Input
          label="Name"
          name="name"
          defaultValue={category?.name ?? ""}
          placeholder="e.g., Electronics"
          error={state?.errors?.name?.[0]}
        />

        <Textarea
          label="Description"
          name="description"
          rows={4}
          defaultValue={category?.description ?? ""}
          placeholder="A short description of this category."
          error={state?.errors?.description?.[0]}
        />

        <div>
          <label
            htmlFor="parent_id"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Parent Category
          </label>
          <select
            id="parent_id"
            name="parent_id"
            defaultValue={category?.parent?.id ?? ""}
            className="w-full cursor-pointer rounded-xl border border-slate-200 bg-white/70 px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/15"
          >
            <option value="">None (top-level category)</option>
            {availableParents.map((parent) => (
              <option key={parent.id} value={parent.id}>
                {parent.name}
              </option>
            ))}
          </select>
          {state?.errors?.parent_id?.[0] && (
            <p className="mt-1.5 text-xs font-medium text-red-500">
              {state.errors.parent_id[0]}
            </p>
          )}
        </div>

        <ImageUpload
          label="Image"
          name="image"
          folder="categories"
          shape="square"
          defaultUrl={category?.image}
          helperText="Upload a category image (optional)."
          error={state?.errors?.image?.[0]}
          onUploadingChange={setIsImageUploading}
        />

        <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            name="is_active"
            defaultChecked={category ? Boolean(category.is_active) : true}
            className="h-4 w-4 cursor-pointer rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
          Category is active
        </label>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isImageUploading}
            pending={isPending || isImageUploading}
            pendingLabel={isImageUploading ? "Uploading image..." : "Saving..."}
          >
            {isEditing ? "Save Changes" : "Create Category"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
