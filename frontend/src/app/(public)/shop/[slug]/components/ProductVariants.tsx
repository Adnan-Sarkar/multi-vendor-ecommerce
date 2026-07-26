import { formatMoney } from "@/lib/productPricing";
import type { ProductVariant } from "@/services/productService";

interface ProductVariantsProps {
  variants: ProductVariant[];
}

export function ProductVariants({ variants }: ProductVariantsProps) {
  if (variants.length === 0) {
    return null;
  }

  return (
    <section className="mt-14">
      <h2 className="mb-5 text-xl font-bold text-gray-900">Available Options</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {variants.map((variant) => (
          <div
            key={variant.id}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <div className="mb-3 flex flex-wrap gap-2">
              {(variant.attribute_values ?? []).map((attributeValue) => (
                <span
                  key={attributeValue.id}
                  className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700"
                >
                  {attributeValue.value}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">
                {formatMoney(variant.price)}
              </span>

              {variant.in_stock ? (
                <span className="text-xs font-medium text-green-600">
                  {variant.stock_qty} in stock
                </span>
              ) : (
                <span className="text-xs font-medium text-red-600">
                  Out of stock
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
