"use client";

import { useRouter } from "next/navigation";
import type { DashboardRange } from "@/services/adminDashboardService";

interface DashboardRangeSelectorProps {
  activeRange: DashboardRange;
}

const RANGES: { value: DashboardRange; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "7d", label: "7 days" },
  { value: "30d", label: "30 days" },
  { value: "90d", label: "90 days" },
  { value: "all", label: "All time" },
];

export function DashboardRangeSelector({
  activeRange,
}: DashboardRangeSelectorProps) {
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-1.5 rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
      {RANGES.map((range) => {
        const isActive = range.value === activeRange;

        return (
          <button
            key={range.value}
            onClick={() => router.push(`/admin?range=${range.value}`)}
            className={`cursor-pointer rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
              isActive
                ? "bg-indigo-600 text-white"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            {range.label}
          </button>
        );
      })}
    </div>
  );
}
