"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export interface DonutSlice {
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  data: DonutSlice[];
  centerValue: string;
  centerLabel: string;
}

export function DonutChart({
  data,
  centerValue,
  centerLabel,
}: DonutChartProps) {
  const total = data.reduce((sum, slice) => sum + slice.value, 0);
  const activeSlices = data.filter((slice) => slice.value > 0);

  if (total === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-gray-400">
        No data yet.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative mx-auto aspect-square w-full max-w-52">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={activeSlices}
              dataKey="value"
              nameKey="label"
              innerRadius="72%"
              outerRadius="100%"
              paddingAngle={2}
              stroke="none"
            >
              {activeSlices.map((slice) => (
                <Cell key={slice.label} fill={slice.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [value, name]}
              wrapperStyle={{ zIndex: 20, outline: "none" }}
              position={{ y: 0 }}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #e5e7eb",
                fontSize: 13,
                boxShadow: "0 4px 12px rgb(0 0 0 / 0.08)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-900">
            {centerValue}
          </span>
          <span className="text-xs text-gray-400">{centerLabel}</span>
        </div>
      </div>

      <ul className="grid w-full min-w-0 grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-1">
        {data.map((slice) => {
          const percentage =
            total > 0 ? Math.round((slice.value / total) * 100) : 0;

          return (
            <li
              key={slice.label}
              className="flex items-center justify-between gap-3 text-sm"
            >
              <span className="flex min-w-0 items-center gap-2.5 text-gray-600">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: slice.color }}
                />
                <span className="truncate">{slice.label}</span>
              </span>
              <span className="flex shrink-0 items-baseline gap-2">
                <span className="font-semibold tabular-nums text-gray-900">
                  {slice.value}
                </span>
                <span className="w-9 text-right text-xs tabular-nums text-gray-400">
                  {percentage}%
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
