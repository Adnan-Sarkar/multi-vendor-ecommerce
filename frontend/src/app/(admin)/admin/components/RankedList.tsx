export interface RankedItem {
  label: string;
  value: number;
  valueLabel: string;
  meta?: string;
}

interface RankedListProps {
  items: RankedItem[];
  emptyMessage: string;
}

export function RankedList({ items, emptyMessage }: RankedListProps) {
  if (items.length === 0) {
    return (
      <div className="flex h-56 items-center justify-center text-sm text-gray-400">
        {emptyMessage}
      </div>
    );
  }

  const maxValue = Math.max(...items.map((item) => item.value), 1);

  return (
    <ul className="space-y-4">
      {items.map((item, index) => (
        <li key={item.label}>
          <div className="mb-1.5 flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-xs font-bold text-indigo-600">
                {index + 1}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-gray-900">
                  {item.label}
                </p>
                {item.meta && (
                  <p className="truncate text-xs text-gray-400">{item.meta}</p>
                )}
              </div>
            </div>
            <span className="shrink-0 text-sm font-semibold tabular-nums text-gray-900">
              {item.valueLabel}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-indigo-500"
              style={{ width: `${(item.value / maxValue) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
