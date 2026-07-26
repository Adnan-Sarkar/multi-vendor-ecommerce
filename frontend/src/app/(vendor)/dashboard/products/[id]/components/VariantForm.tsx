"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button, ImageUpload, Input } from "@/components/ui";
import {
  createVariantAction,
  updateVariantAction,
} from "@/actions/variantActions";
import type { Attribute } from "@/services/attributeService";
import type { ProductVariant } from "@/services/productService";

interface VariantFormProps {
  productId: number;
  attributes: Attribute[];
  initialVariant?: ProductVariant;
  onDone: () => void;
  onCancel: () => void;
}

function buildInitialSelection(
  attributes: Attribute[],
  initialVariant: ProductVariant | undefined,
): Record<number, string> {
  const selection: Record<number, string> = {};

  if (!initialVariant) {
    return selection;
  }

  const selectedValueIds = (initialVariant.attribute_values ?? []).map(
    (attributeValue) => attributeValue.id,
  );

  for (const attribute of attributes) {
    const matchedValue = attribute.values.find((value) =>
      selectedValueIds.includes(value.id),
    );

    if (matchedValue) {
      selection[attribute.id] = String(matchedValue.id);
    }
  }

  return selection;
}

export function VariantForm({
  productId,
  attributes,
  initialVariant,
  onDone,
  onCancel,
}: VariantFormProps) {
  const isEditing = Boolean(initialVariant);
  const [isSaving, startSaving] = useTransition();
  const [isImageUploading, setIsImageUploading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const selectedValueIds = attributes
      .map((attribute) => Number(formData.get(`attribute_${attribute.id}`)))
      .filter((valueId) => valueId > 0);

    if (selectedValueIds.length === 0) {
      toast.error("Select at least one attribute value.");
      return;
    }

    const imageUrl = String(formData.get("image") ?? "").trim();

    const payload = {
      price: Number(formData.get("price")),
      stock_qty: Number(formData.get("stock_qty")),
      in_stock: formData.get("in_stock") !== null,
      image: imageUrl === "" ? null : imageUrl,
      attributes: selectedValueIds,
    };

    startSaving(async () => {
      const result = initialVariant
        ? await updateVariantAction(productId, initialVariant.id, payload)
        : await createVariantAction(productId, payload);

      if (result.success) {
        toast.success(result.message);
        onDone();
      } else {
        toast.error(result.message);
      }
    });
  };

  const initialSelection = buildInitialSelection(attributes, initialVariant);

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl border border-indigo-100 bg-indigo-50/40 p-5"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {attributes.map((attribute) => (
          <div key={attribute.id}>
            <label
              htmlFor={`attribute_${attribute.id}`}
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              {attribute.name}
            </label>
            <select
              id={`attribute_${attribute.id}`}
              name={`attribute_${attribute.id}`}
              defaultValue={initialSelection[attribute.id] ?? ""}
              className="w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15"
            >
              <option value="">— None —</option>
              {attribute.values.map((value) => (
                <option key={value.id} value={value.id}>
                  {value.value}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Price ($)"
          name="price"
          type="number"
          step="0.01"
          min="0"
          defaultValue={initialVariant?.price ?? ""}
          placeholder="0.00"
        />
        <Input
          label="Stock Quantity"
          name="stock_qty"
          type="number"
          min="0"
          defaultValue={initialVariant?.stock_qty ?? ""}
          placeholder="0"
        />
      </div>

      <ImageUpload
        label="Variant Image"
        name="image"
        folder="products"
        shape="square"
        defaultUrl={initialVariant?.image}
        helperText="Upload an image for this variant (optional)."
        onUploadingChange={setIsImageUploading}
      />

      <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-slate-700">
        <input
          type="checkbox"
          name="in_stock"
          defaultChecked={initialVariant ? initialVariant.in_stock : true}
          className="h-4 w-4 cursor-pointer rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
        />
        Variant is in stock
      </label>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isImageUploading}
          pending={isSaving || isImageUploading}
          pendingLabel={isImageUploading ? "Uploading image..." : "Saving..."}
        >
          {isEditing ? "Save Changes" : "Add Variant"}
        </Button>
      </div>
    </form>
  );
}
