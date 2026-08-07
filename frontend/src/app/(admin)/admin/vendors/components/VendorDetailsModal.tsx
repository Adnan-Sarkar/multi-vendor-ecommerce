"use client";

import { useState } from "react";
import {
  UserIcon,
  EnvelopeSimpleIcon,
  PhoneIcon,
  MapPinIcon,
  StorefrontIcon,
  CalendarBlankIcon,
} from "@phosphor-icons/react";
import { Button, Modal, StatusBadge } from "@/components/ui";
import type { PendingVendor } from "@/services/adminVendorService";

interface VendorDetailsModalProps {
  vendor: PendingVendor | null;
  busy: boolean;
  onClose: () => void;
  onApprove: (id: number) => void;
  onReject: (id: number, reason: string) => void;
}

function Field({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string | null;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-gray-400">{icon}</div>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
          {label}
        </p>
        <p className="truncate text-sm font-medium text-gray-900">
          {value || "—"}
        </p>
      </div>
    </div>
  );
}

export function VendorDetailsModal({
  vendor,
  busy,
  onClose,
  onApprove,
  onReject,
}: VendorDetailsModalProps) {
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState("");

  if (!vendor) return null;

  const location = [vendor.address, vendor.city, vendor.state, vendor.zip_code]
    .filter(Boolean)
    .join(", ");

  const registered = vendor.user?.created_at
    ? new Date(vendor.user.created_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  const handleClose = () => {
    setRejecting(false);
    setReason("");
    onClose();
  };

  const isPending = (vendor.status ?? "pending") === "pending";

  const footer = !isPending ? (
    <Button variant="outline" onClick={handleClose}>
      Close
    </Button>
  ) : rejecting ? (
    <>
      <Button
        variant="ghost"
        onClick={() => setRejecting(false)}
        disabled={busy}
      >
        Cancel
      </Button>
      <Button
        variant="secondary"
        className="bg-red-600! hover:bg-red-700!"
        pending={busy}
        pendingLabel="Rejecting..."
        disabled={reason.trim().length < 5}
        onClick={() => onReject(vendor.id, reason.trim())}
      >
        Confirm Rejection
      </Button>
    </>
  ) : (
    <>
      <Button
        variant="outline"
        onClick={() => setRejecting(true)}
        disabled={busy}
      >
        Reject
      </Button>
      <Button
        pending={busy}
        pendingLabel="Approving..."
        onClick={() => onApprove(vendor.id)}
      >
        Approve Vendor
      </Button>
    </>
  );

  return (
    <Modal
      open={!!vendor}
      onClose={handleClose}
      title="Vendor Application"
      footer={footer}
      size="xl"
    >
      <div className="mb-6 overflow-hidden rounded-xl border border-gray-200">
        <div className="h-28 bg-linear-to-r from-indigo-500 to-violet-500">
          {vendor.banner && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={vendor.banner}
              alt=""
              className="h-full w-full object-cover"
            />
          )}
        </div>
        <div className="flex items-center gap-4 px-5 pb-4">
          <div className="-mt-8 flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl border-4 border-white bg-indigo-50 text-indigo-600 shadow-sm">
            {vendor.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={vendor.logo}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <StorefrontIcon size={28} weight="bold" />
            )}
          </div>
          <div className="pt-3">
            <div className="flex items-center gap-2">
              <h4 className="text-lg font-bold text-gray-900">
                {vendor.shop_name}
              </h4>
              <StatusBadge status={vendor.status ?? "pending"} />
            </div>
            <p className="text-sm text-gray-500">/{vendor.slug}</p>
          </div>
        </div>
      </div>

      {vendor.description && (
        <div className="mb-6">
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">
            Description
          </p>
          <p className="text-sm leading-relaxed text-gray-700">
            {vendor.description}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field
          icon={<UserIcon size={18} />}
          label="Owner"
          value={vendor.user?.name}
        />
        <Field
          icon={<EnvelopeSimpleIcon size={18} />}
          label="Email"
          value={vendor.user?.email}
        />
        <Field
          icon={<PhoneIcon size={18} />}
          label="Phone"
          value={vendor.user?.phone}
        />
        <Field
          icon={<CalendarBlankIcon size={18} />}
          label="Registered"
          value={registered}
        />
        <div className="sm:col-span-2">
          <Field
            icon={<MapPinIcon size={18} />}
            label="Location"
            value={location}
          />
        </div>
      </div>

      {rejecting && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4">
          <label className="mb-1.5 block text-sm font-semibold text-red-800">
            Rejection reason
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={3}
            placeholder="Explain why this application is being rejected (min 5 characters)…"
            className="w-full resize-none rounded-lg border border-red-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-200"
          />
          <p className="mt-1 text-xs text-red-600">
            The vendor will be notified with this reason.
          </p>
        </div>
      )}
    </Modal>
  );
}
