"use client";

import { useState } from "react";
import Image from "next/image";
import { PackageIcon } from "@phosphor-icons/react";
import { Button, Modal, Textarea, StatusBadge } from "@/components/ui";
import { formatMoney } from "@/lib/productPricing";
import type { AdminProduct } from "@/services/adminProductService";

const MINIMUM_REJECTION_REASON_LENGTH = 10;

interface ProductModerationModalProps {
  product: AdminProduct | null;
  busy: boolean;
  onClose: () => void;
  onApprove: (productId: number) => void;
  onReject: (productId: number, reason: string) => void;
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
  );
}

export function ProductModerationModal({
  product,
  busy,
  onClose,
  onApprove,
  onReject,
}: ProductModerationModalProps) {
  const [rejectionReason, setRejectionReason] = useState("");

  const isPending = product?.status === "pending";
  const canReject =
    rejectionReason.trim().length >= MINIMUM_REJECTION_REASON_LENGTH;

  const handleApprove = () => {
    if (product) {
      onApprove(product.id);
    }
  };

  const handleReject = () => {
    if (product && canReject) {
      onReject(product.id, rejectionReason.trim());
    }
  };

  return (
    <Modal
      open={product !== null}
      onClose={onClose}
      size="lg"
      title="Review Product"
      footer={
        isPending ? (
          <>
            <Button
              variant="secondary"
              onClick={handleReject}
              disabled={!canReject || busy}
              pending={busy}
              pendingLabel="Working..."
            >
              Reject
            </Button>
            <Button onClick={handleApprove} disabled={busy}>
              Approve
            </Button>
          </>
        ) : (
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        )
      }
    >
      {product && (
        <div className="space-y-5">
          <div className="flex items-start gap-4">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100 text-gray-400">
              {product.thumbnail ? (
                <Image
                  src={product.thumbnail}
                  alt={product.name}
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                />
              ) : (
                <PackageIcon size={32} />
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-gray-900">
                  {product.name}
                </h3>
                <StatusBadge status={product.status} />
              </div>
              <p className="text-xs text-gray-400">{product.sku}</p>
              <p className="mt-2 text-sm text-gray-600">
                {product.short_description}
              </p>
            </div>
          </div>

          <div className="divide-y divide-gray-100 rounded-xl border border-gray-100 px-4">
            <DetailRow
              label="Vendor"
              value={product.vendor?.shop_name ?? "—"}
            />
            <DetailRow
              label="Regular Price"
              value={formatMoney(product.regular_price)}
            />
            <DetailRow
              label="Sale Price"
              value={product.sale_price ? formatMoney(product.sale_price) : "—"}
            />
            <DetailRow
              label="Stock"
              value={(product.stock_qty ?? 0).toString()}
            />
            <DetailRow
              label="Categories"
              value={
                product.categories && product.categories.length > 0
                  ? product.categories
                      .map((category) => category.name)
                      .join(", ")
                  : "—"
              }
            />
          </div>

          {product.description && (
            <div>
              <p className="mb-1.5 text-sm font-semibold text-gray-900">
                Description
              </p>
              <p className="whitespace-pre-line text-sm leading-relaxed text-gray-600">
                {product.description}
              </p>
            </div>
          )}

          {product.images && product.images.length > 0 && (
            <div>
              <p className="mb-2 text-sm font-semibold text-gray-900">
                Gallery
              </p>
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image) => (
                  <div
                    key={image.id}
                    className="relative aspect-square overflow-hidden rounded-lg border border-gray-200"
                  >
                    <Image
                      src={image.image_url}
                      alt=""
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {isPending && (
            <div>
              <Textarea
                label="Rejection Reason"
                name="rejection_reason"
                rows={3}
                value={rejectionReason}
                onChange={(event) => setRejectionReason(event.target.value)}
                placeholder="Required only when rejecting (at least 10 characters)."
              />
              <p className="mt-1.5 text-xs text-gray-400">
                Explain what the vendor needs to fix before approval.
              </p>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}
