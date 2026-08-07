"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  EyeIcon,
  CheckCircleIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
import { DataTable, StatusBadge, type Column } from "@/components/ui";
import type {
  PendingVendor,
  PaginationMeta,
} from "@/services/adminVendorService";
import {
  approveVendorAction,
  rejectVendorAction,
  type ActionResult,
} from "@/actions/adminVendorActions";
import { VendorDetailsModal } from "./VendorDetailsModal";

interface VendorsTableProps {
  vendors: PendingVendor[];
  meta: PaginationMeta;
}

export function VendorsTable({ vendors, meta }: VendorsTableProps) {
  const router = useRouter();
  const [selectedVendor, setSelectedVendor] = useState<PendingVendor | null>(
    null,
  );
  const [processingVendorId, setProcessingVendorId] = useState<number | null>(
    null,
  );
  const [feedback, setFeedback] = useState<{
    success: boolean;
    text: string;
  } | null>(null);
  const [isProcessing, startProcessing] = useTransition();

  const runAction = (vendorId: number, action: () => Promise<ActionResult>) => {
    setProcessingVendorId(vendorId);
    setFeedback(null);
    startProcessing(async () => {
      const result = await action();
      setFeedback({ success: result.success, text: result.message });
      setProcessingVendorId(null);
      if (result.success) {
        setSelectedVendor(null);
        router.refresh();
      }
    });
  };

  const approveVendor = (vendorId: number) =>
    runAction(vendorId, () => approveVendorAction(vendorId));

  const rejectVendor = (vendorId: number, reason: string) =>
    runAction(vendorId, () => rejectVendorAction(vendorId, reason));

  const isVendorProcessing = (vendorId: number) =>
    isProcessing && processingVendorId === vendorId;

  const columns: Column<PendingVendor>[] = [
    {
      header: "Shop",
      cell: (vendor) => (
        <div>
          <p className="font-bold text-gray-900">{vendor.shop_name}</p>
          <p className="text-xs text-gray-400">/{vendor.slug}</p>
        </div>
      ),
    },
    {
      header: "Owner",
      cell: (vendor) => (
        <span className="font-medium text-gray-900">
          {vendor.user?.name ?? "—"}
        </span>
      ),
    },
    {
      header: "Email",
      cell: (vendor) => vendor.user?.email ?? "—",
    },
    {
      header: "Status",
      cell: (vendor) => <StatusBadge status={vendor.status ?? "pending"} />,
    },
    {
      header: "Actions",
      align: "right",
      cell: (vendor) => (
        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => setSelectedVendor(vendor)}
            title="View details"
            className="cursor-pointer rounded-lg p-2 text-gray-400 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
          >
            <EyeIcon size={20} />
          </button>
          {vendor.status === "pending" && (
            <button
              onClick={() => approveVendor(vendor.id)}
              disabled={isVendorProcessing(vendor.id)}
              title="Approve vendor"
              className="cursor-pointer rounded-lg p-2 text-gray-400 transition-colors hover:bg-green-50 hover:text-green-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CheckCircleIcon size={20} />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      {feedback && (
        <div
          className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium ${
            feedback.success
              ? "border-green-200 bg-green-50 text-green-700"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          <WarningCircleIcon size={18} weight="bold" />
          {feedback.text}
        </div>
      )}

      <DataTable
        columns={columns}
        data={vendors}
        rowKey={(vendor) => vendor.id}
        title={`Vendors (${meta.total})`}
        emptyMessage="No vendors found."
        meta={meta}
      />

      <VendorDetailsModal
        vendor={selectedVendor}
        busy={selectedVendor ? isVendorProcessing(selectedVendor.id) : false}
        onClose={() => setSelectedVendor(null)}
        onApprove={approveVendor}
        onReject={rejectVendor}
      />
    </>
  );
}
