"use client";

import { useActionState, useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button, CheckboxChips, Input, Textarea } from "@/components/ui";
import type { ProductFormState } from "@/actions/productActions";
import type { Category, Tag } from "@/services/catalogService";
import type { VendorProduct } from "@/services/vendorProductService";

type ProductFormAction = (
  previousState: ProductFormState | null,
  formData: FormData,
) => Promise<ProductFormState>;

interface ProductFormProps {
  action: ProductFormAction;
  categories: Category[];
  tags: Tag[];
  submitLabel: string;
  pendingLabel: string;
  initialProduct?: VendorProduct;
}

function FormSection({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <span className="h-8 w-1.5 rounded-full bg-indigo-600" />
        <div>
          <h2 className="text-base font-bold text-gray-900">{title}</h2>
          <p className="mt-0.5 text-xs text-gray-500">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

export function ProductForm({
  action,
  categories,
  tags,
  submitLabel,
  pendingLabel,
  initialProduct,
}: ProductFormProps) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<ProductFormState | null, FormData>(
    action,
    null,
  );

  const selectedCategoryIds = initialProduct?.categories?.map((category) => category.id) ?? [];
  const selectedTagIds = initialProduct?.tags?.map((tag) => tag.id) ?? [];

  useEffect(() => {
    if (isPending) {
      toast.loading("Saving product...", { id: "product-form" });
      return;
    }

    if (state?.success) {
      toast.success(state.message, { id: "product-form" });
      const targetId = state.productId ?? initialProduct?.id;
      router.push(targetId ? `/dashboard/products/${targetId}` : "/dashboard/products");
    } else if (state && !state.success) {
      toast.error(state.message, { id: "product-form" });
    } else {
      toast.dismiss("product-form");
    }
  }, [state, isPending, router, initialProduct?.id]);

  return (
    <form action={formAction} className="space-y-6">
      <FormSection title="Basic Information" description="Name and descriptions shown to customers.">
        <div className="space-y-5">
          <Input
            label="Product Name"
            name="name"
            defaultValue={initialProduct?.name ?? ""}
            placeholder="e.g., Wireless Noise-Cancelling Headphones"
            error={state?.errors?.name?.[0]}
          />
          <Textarea
            label="Short Description"
            name="short_description"
            rows={3}
            defaultValue={initialProduct?.short_description ?? ""}
            placeholder="A brief summary shown in product listings."
            error={state?.errors?.short_description?.[0]}
          />
          <Textarea
            label="Full Description"
            name="description"
            rows={6}
            defaultValue={initialProduct?.description ?? ""}
            placeholder="Detailed product description (optional)."
            error={state?.errors?.description?.[0]}
          />
          <Input
            label="Thumbnail URL"
            name="thumbnail"
            type="url"
            defaultValue={initialProduct?.thumbnail ?? ""}
            placeholder="https://... (optional)"
            error={state?.errors?.thumbnail?.[0]}
          />
        </div>
      </FormSection>

      <FormSection title="Organization" description="Help customers find this product.">
        <div className="space-y-5">
          <CheckboxChips
            label="Categories"
            name="categories"
            options={categories}
            selectedIds={selectedCategoryIds}
            error={state?.errors?.categories?.[0]}
            emptyMessage="No categories available yet."
          />
          <CheckboxChips
            label="Tags"
            name="tags"
            options={tags}
            selectedIds={selectedTagIds}
            error={state?.errors?.tags?.[0]}
            emptyMessage="No tags available yet."
          />
        </div>
      </FormSection>

      <FormSection title="Pricing" description="Set the regular and optional sale price.">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input
            label="Regular Price ($)"
            name="regular_price"
            type="number"
            step="0.01"
            min="0"
            defaultValue={initialProduct?.regular_price ?? ""}
            placeholder="0.00"
            error={state?.errors?.regular_price?.[0]}
          />
          <Input
            label="Sale Price ($)"
            name="sale_price"
            type="number"
            step="0.01"
            min="0"
            defaultValue={initialProduct?.sale_price ?? ""}
            placeholder="0.00 (optional)"
            error={state?.errors?.sale_price?.[0]}
          />
        </div>
      </FormSection>

      <FormSection title="Inventory" description="Track stock levels for this product.">
        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Input
              label="Stock Quantity"
              name="stock_qty"
              type="number"
              min="0"
              defaultValue={initialProduct?.stock_qty ?? ""}
              placeholder="0"
              error={state?.errors?.stock_qty?.[0]}
            />
            <Input
              label="Low Stock Threshold"
              name="low_stock_threshold"
              type="number"
              min="0"
              defaultValue={initialProduct?.low_stock_threshold ?? ""}
              placeholder="0"
              error={state?.errors?.low_stock_threshold?.[0]}
            />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-8">
            <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                name="manage_stock"
                defaultChecked={initialProduct ? initialProduct.manage_stock : true}
                className="h-4 w-4 cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              Track stock quantity
            </label>
            <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                name="in_stock"
                defaultChecked={initialProduct ? initialProduct.in_stock : true}
                className="h-4 w-4 cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              Product is in stock
            </label>
          </div>
        </div>
      </FormSection>

      <FormSection title="Shipping" description="Used to calculate delivery for physical goods.">
        <Input
          label="Weight (kg)"
          name="weight"
          type="number"
          step="0.01"
          min="0"
          defaultValue={initialProduct?.weight ?? ""}
          placeholder="0.00"
          error={state?.errors?.weight?.[0]}
        />
      </FormSection>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" pending={isPending} pendingLabel={pendingLabel}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
