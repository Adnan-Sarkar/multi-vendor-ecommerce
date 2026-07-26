import { WarningCircleIcon, PackageIcon } from "@phosphor-icons/react/ssr";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { VendorProduct } from "@/services/vendorProductService";
import type { ProductVariant } from "@/services/productService";
import type { Attribute } from "@/services/attributeService";
import { ProductImagesManager } from "./ProductImagesManager";
import { ProductVariantsManager } from "./ProductVariantsManager";

function formatPrice(price: string | null): string {
  if (price === null) return "—";
  return `$${Number(price).toFixed(2)}`;
}

function formatDate(value: string | null | undefined): string {
  if (!value) return "—";

  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-3 text-base font-bold text-gray-900">{title}</h2>
      {children}
    </section>
  );
}

interface ProductDetailsProps {
  product: VendorProduct;
  variants: ProductVariant[];
  attributes: Attribute[];
}

export function ProductDetails({
  product,
  variants,
  attributes,
}: ProductDetailsProps) {
  return (
    <div className="space-y-6">
      {product.status === "rejected" && product.rejection_reason && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
          <WarningCircleIcon
            size={20}
            weight="bold"
            className="mt-0.5 text-red-600"
          />
          <div>
            <p className="text-sm font-semibold text-red-800">
              Product rejected
            </p>
            <p className="mt-0.5 text-sm text-red-700">
              {product.rejection_reason}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-5">
              <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100 text-gray-400">
                {product.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.thumbnail}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <PackageIcon size={32} />
                )}
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-bold text-gray-900">
                    {product.name}
                  </h2>
                  <StatusBadge status={product.status} />
                </div>
                <p className="mt-1 text-sm text-gray-400">{product.sku}</p>
                <p className="mt-3 text-sm text-gray-600">
                  {product.short_description}
                </p>
              </div>
            </div>
          </section>

          {product.description && (
            <Card title="Description">
              <p className="whitespace-pre-line text-sm leading-relaxed text-gray-600">
                {product.description}
              </p>
            </Card>
          )}

          <Card title="Organization">
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                  Categories
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.categories && product.categories.length > 0 ? (
                    product.categories.map((category) => (
                      <span
                        key={category.id}
                        className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700"
                      >
                        {category.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-400">None</span>
                  )}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                  Tags
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.tags && product.tags.length > 0 ? (
                    product.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600"
                      >
                        {tag.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-400">None</span>
                  )}
                </div>
              </div>
            </div>
          </Card>

          <ProductImagesManager
            productId={product.id}
            existingImages={product.images ?? []}
          />

          <ProductVariantsManager
            productId={product.id}
            variants={variants}
            attributes={attributes}
          />
        </div>

        <div className="space-y-6">
          <Card title="Pricing">
            <div className="divide-y divide-gray-100">
              <InfoRow
                label="Regular Price"
                value={formatPrice(product.regular_price)}
              />
              <InfoRow
                label="Sale Price"
                value={formatPrice(product.sale_price)}
              />
              <InfoRow
                label="Sale Starts"
                value={formatDate(product.sale_start_date)}
              />
              <InfoRow
                label="Sale Ends"
                value={formatDate(product.sale_end_date)}
              />
            </div>
          </Card>

          <Card title="Inventory">
            <div className="divide-y divide-gray-100">
              <InfoRow
                label="Stock Quantity"
                value={(product.stock_qty ?? 0).toString()}
              />
              <InfoRow
                label="Low Stock Alert"
                value={(product.low_stock_threshold ?? 0).toString()}
              />
              <InfoRow
                label="Tracks Stock"
                value={product.manage_stock ? "Yes" : "No"}
              />
              <InfoRow
                label="In Stock"
                value={product.in_stock ? "Yes" : "No"}
              />
            </div>
          </Card>

          <Card title="Shipping">
            <div className="divide-y divide-gray-100">
              <InfoRow
                label="Weight"
                value={product.weight ? `${product.weight} kg` : "—"}
              />
            </div>
          </Card>

          <Card title="Overview">
            <div className="divide-y divide-gray-100">
              <InfoRow label="Views" value={product.views.toString()} />
              <InfoRow label="Created" value={formatDate(product.created_at)} />
              <InfoRow
                label="Approved"
                value={formatDate(product.approved_at)}
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
