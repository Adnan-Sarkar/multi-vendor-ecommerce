export default function VendorsLoading() {
  const skeletonRows = Array.from({ length: 6 });

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="h-7 w-56 animate-pulse rounded-lg bg-gray-200" />
        <div className="h-4 w-80 animate-pulse rounded bg-gray-100" />
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-6">
          <div className="h-6 w-64 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="divide-y divide-gray-100">
          {skeletonRows.map((_, rowIndex) => (
            <div key={rowIndex} className="flex items-center gap-6 px-6 py-4">
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                <div className="h-3 w-20 animate-pulse rounded bg-gray-100" />
              </div>
              <div className="h-4 w-28 flex-1 animate-pulse rounded bg-gray-100" />
              <div className="h-4 w-40 flex-1 animate-pulse rounded bg-gray-100" />
              <div className="h-4 w-24 flex-1 animate-pulse rounded bg-gray-100" />
              <div className="flex gap-2">
                <div className="h-9 w-9 animate-pulse rounded-lg bg-gray-100" />
                <div className="h-9 w-9 animate-pulse rounded-lg bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
