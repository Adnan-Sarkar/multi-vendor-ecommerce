import type { ReactNode } from "react";
import { Pagination } from "./Pagination";

export type Column<T> = {
  header: ReactNode;
  cell: (row: T) => ReactNode;
  align?: "left" | "right" | "center";
  headerClassName?: string;
  cellClassName?: string;
};

export type TableMeta = {
  current_page: number;
  last_page: number;
  total: number;
  from: number | null;
  to: number | null;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string | number;
  emptyMessage?: string;
  title?: ReactNode;
  toolbar?: ReactNode;
  meta?: TableMeta;
  rowClassName?: (row: T) => string;
};

const ALIGN: Record<NonNullable<Column<unknown>["align"]>, string> = {
  left: "text-left",
  right: "text-right",
  center: "text-center",
};

export function DataTable<T>({
  columns,
  data,
  rowKey,
  emptyMessage = "No records found.",
  title,
  toolbar,
  meta,
  rowClassName,
}: DataTableProps<T>) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      {(title || toolbar) && (
        <div className="flex items-center justify-between gap-4 p-6 border-b border-gray-200">
          {title && <h2 className="text-lg font-bold text-gray-900">{title}</h2>}
          {toolbar}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
            <tr>
              {columns.map((column, columnIndex) => (
                <th
                  key={columnIndex}
                  className={`px-6 py-4 ${ALIGN[column.align ?? "left"]} ${column.headerClassName ?? ""}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((row) => (
              <tr
                key={rowKey(row)}
                className={`transition-colors group hover:bg-gray-50 ${rowClassName?.(row) ?? ""}`}
              >
                {columns.map((column, columnIndex) => (
                  <td
                    key={columnIndex}
                    className={`px-6 py-4 ${ALIGN[column.align ?? "left"]} ${column.cellClassName ?? ""}`}
                  >
                    {column.cell(row)}
                  </td>
                ))}
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {meta && (
        <Pagination
          currentPage={meta.current_page}
          lastPage={meta.last_page}
          total={meta.total}
          from={meta.from}
          to={meta.to}
        />
      )}
    </div>
  );
}
