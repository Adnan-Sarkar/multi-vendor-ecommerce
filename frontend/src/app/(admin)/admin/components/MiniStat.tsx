import type { ReactNode } from "react";

interface MiniStatProps {
  label: string;
  value: string;
  icon: ReactNode;
}

export function MiniStat({ label, value, icon }: MiniStatProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-500">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="truncate text-xs font-medium text-gray-500">{label}</p>
        <p className="text-lg font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
