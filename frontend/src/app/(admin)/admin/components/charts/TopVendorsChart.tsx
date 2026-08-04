"use client";

import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatMoney } from "@/lib/productPricing";
import type { TopVendor } from "@/services/adminDashboardService";

interface TopVendorsChartProps {
  data: TopVendor[];
}

const BAR_COLORS = ["#6366f1", "#818cf8", "#a5b4fc", "#c7d2fe", "#e0e7ff"];

export function TopVendorsChart({ data }: TopVendorsChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-gray-400">
        No vendor earnings yet.
      </div>
    );
  }

  const chartHeight = Math.max(data.length * 52, 160);

  return (
    <div className="w-full" style={{ height: chartHeight }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
        >
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="shop_name"
            width={120}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12, fill: "#475569" }}
          />
          <Tooltip
            cursor={{ fill: "#f8fafc" }}
            formatter={(value) => [formatMoney(Number(value)), "Earnings"]}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #e5e7eb",
              fontSize: 13,
            }}
          />
          <Bar dataKey="earning" radius={[0, 6, 6, 0]} barSize={22}>
            {data.map((vendor, index) => (
              <Cell
                key={vendor.shop_name}
                fill={BAR_COLORS[index % BAR_COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
