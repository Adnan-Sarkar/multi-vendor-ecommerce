import React from "react";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
}

export function StatCard({ title, value, icon, trend }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
        <div className="h-12 w-12 rounded-lg bg-gray-50 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="text-sm font-medium text-gray-500">
        {trend}
      </div>
    </div>
  );
}
