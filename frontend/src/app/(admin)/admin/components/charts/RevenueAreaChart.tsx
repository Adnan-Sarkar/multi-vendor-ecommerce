"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatMoney } from "@/lib/productPricing";
import type { MonthlyRevenue } from "@/services/adminDashboardService";

interface RevenueAreaChartProps {
  data: MonthlyRevenue[];
}

function formatCompactMoney(value: number): string {
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k`;
  }

  return `$${value}`;
}

export function RevenueAreaChart({ data }: RevenueAreaChartProps) {
  const hasRevenue = data.some((point) => point.total > 0);

  if (!hasRevenue) {
    return (
      <div className="flex h-72 items-center justify-center text-sm text-gray-400">
        No revenue recorded in the last 6 months.
      </div>
    );
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12, fill: "#94a3b8" }}
          />
          <YAxis
            width={48}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12, fill: "#94a3b8" }}
            tickFormatter={(value) => formatCompactMoney(Number(value))}
          />
          <Tooltip
            cursor={{ stroke: "#c7d2fe", strokeWidth: 1 }}
            formatter={(value) => [formatMoney(Number(value)), "Revenue"]}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #e5e7eb",
              fontSize: 13,
            }}
          />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#6366f1"
            strokeWidth={2.5}
            fill="url(#revenueFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
