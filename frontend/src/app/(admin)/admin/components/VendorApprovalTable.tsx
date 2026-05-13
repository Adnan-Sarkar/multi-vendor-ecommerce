"use client";

import { VendorApplication } from "@/services/adminService";
import { Check, X } from "@phosphor-icons/react";

interface VendorApprovalTableProps {
  applications: VendorApplication[];
}

export function VendorApprovalTable({ applications }: VendorApprovalTableProps) {
  const handleApprove = (id: string) => {
    if (confirm("Approve this vendor application?")) {
      console.log("Approved vendor:", id);
    }
  };

  const handleReject = (id: string) => {
    if (confirm("Reject this vendor application?")) {
      console.log("Rejected vendor:", id);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900">Pending Vendor Approvals</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
            <tr>
              <th className="px-6 py-4">Store Name</th>
              <th className="px-6 py-4">Owner</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Applied On</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {applications.map((app) => (
              <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-bold text-gray-900">{app.storeName}</td>
                <td className="px-6 py-4">{app.ownerName}</td>
                <td className="px-6 py-4">{app.email}</td>
                <td className="px-6 py-4">{app.appliedDate}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handleApprove(app.id)}
                      title="Approve Vendor"
                      className="p-2 text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                    >
                      <Check size={20} weight="bold" />
                    </button>
                    <button 
                      onClick={() => handleReject(app.id)}
                      title="Reject Vendor"
                      className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <X size={20} weight="bold" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {applications.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  No pending vendor applications.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
