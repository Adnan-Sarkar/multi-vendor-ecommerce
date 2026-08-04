"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { MonthlyCount } from "@/services/adminDashboardService";

interface NewCustomersChartProps {
  data: MonthlyCount[];
}

export function NewCustomersChart({ data }: NewCustomersChartProps) {
  const hasData = data.some((point) => point.count > 0);

  if (!hasData) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-gray-400">
        No new customers in the last 6 months.
      </div>
    );
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12, fill: "#94a3b8" }}
          />
          <YAxis
            allowDecimals={false}
            width={32}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12, fill: "#94a3b8" }}
          />
          <Tooltip
            cursor={{ fill: "#f8fafc" }}
            formatter={(value) => [value, "New customers"]}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #e5e7eb",
              fontSize: 13,
            }}
          />
          <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={34} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
