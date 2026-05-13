"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createProductAction } from "@/actions/productActions";
import { useRouter } from "next/navigation";

const productSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters"),
  category: z.string().min(1, "Please select a category"),
  price: z.coerce.number().min(0.01, "Price must be greater than 0"),
  short_description: z.string().min(10, "Description must be at least 10 characters"),
  in_stock: z.boolean().default(true),
});

type ProductFormValues = z.infer<typeof productSchema>;

export function ProductForm() {
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      in_stock: true,
    }
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      const result = await createProductAction(data);
      if (result?.success) {
        router.push("/dashboard/products");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to create product");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-900">Product Name</label>
        <input 
          {...register("name")}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="e.g., iPhone 15 Pro"
        />
        {errors.name && <p className="text-red-500 text-sm font-medium">{errors.name.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-900">Category</label>
          <select 
            {...register("category")}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="">Select Category...</option>
            <option value="Electronics">Electronics</option>
            <option value="Computers">Computers</option>
            <option value="Audio">Audio</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm font-medium">{errors.category.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-900">Price ($)</label>
          <input 
            type="number"
            step="0.01"
            {...register("price")}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="0.00"
          />
          {errors.price && <p className="text-red-500 text-sm font-medium">{errors.price.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-900">Short Description</label>
        <textarea 
          {...register("short_description")}
          rows={4}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Briefly describe the product..."
        />
        {errors.short_description && <p className="text-red-500 text-sm font-medium">{errors.short_description.message}</p>}
      </div>

      <div className="flex items-center gap-3">
        <input 
          type="checkbox"
          id="in_stock"
          {...register("in_stock")}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label htmlFor="in_stock" className="text-sm font-medium text-gray-900 cursor-pointer">Product is currently in stock</label>
      </div>

      <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
        <button 
          type="button" 
          onClick={() => router.back()}
          className="px-6 py-2 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-indigo-600 text-white px-8 py-2 rounded-lg font-bold hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Creating..." : "Create Product"}
        </button>
      </div>
    </form>
  );
}

