"use client";

import { useRouter } from "next/navigation";

interface ProductStatusTabsProps {
  activeStatus: string;
}

const STATUS_TABS = [
  { value: "", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

export function ProductStatusTabs({ activeStatus }: ProductStatusTabsProps) {
  const router = useRouter();

  const goToStatus = (status: string) => {
    const params = new URLSearchParams();

    if (status) {
      params.set("status", status);
    }

    const query = params.toString();
    router.push(query ? `/admin/products?${query}` : "/admin/products");
  };

  return (
    <div className="flex flex-wrap gap-2">
      {STATUS_TABS.map((tab) => {
        const isActive = tab.value === activeStatus;

        return (
          <button
            key={tab.value}
            onClick={() => goToStatus(tab.value)}
            className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              isActive
                ? "bg-indigo-600 text-white"
                : "border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
