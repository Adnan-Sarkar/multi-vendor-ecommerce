import type { ReactNode } from "react";

type Tone = "green" | "indigo" | "amber" | "purple" | "blue";

const TONES: Record<Tone, string> = {
  green: "bg-green-50 text-green-600",
  indigo: "bg-indigo-50 text-indigo-600",
  amber: "bg-amber-50 text-amber-600",
  purple: "bg-purple-50 text-purple-600",
  blue: "bg-blue-50 text-blue-600",
};

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  subtitle: string;
  tone: Tone;
}

export function StatCard({ title, value, icon, subtitle, tone }: StatCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${TONES[tone]}`}
        >
          {icon}
        </span>
      </div>
      <div>
        <h3 className="text-2xl font-bold tracking-tight text-gray-900">
          {value}
        </h3>
        <p className="mt-1 text-xs font-medium text-gray-400">{subtitle}</p>
      </div>
    </div>
  );
}
