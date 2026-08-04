import type { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export function ChartCard({
  title,
  subtitle,
  children,
  className,
}: ChartCardProps) {
  return (
    <div
      className={`min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm ${className ?? ""}`}
    >
      <div className="mb-5">
        <h3 className="text-base font-bold text-gray-900">{title}</h3>
        {subtitle && <p className="mt-0.5 text-xs text-gray-400">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
