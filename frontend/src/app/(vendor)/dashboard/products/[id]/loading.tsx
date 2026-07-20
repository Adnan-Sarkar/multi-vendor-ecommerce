export default function ProductDetailsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 animate-pulse rounded-lg bg-gray-200" />
        <div className="h-8 w-48 animate-pulse rounded-lg bg-gray-200" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="h-40 animate-pulse rounded-xl border border-gray-200 bg-white shadow-sm" />
          <div className="h-32 animate-pulse rounded-xl border border-gray-200 bg-white shadow-sm" />
        </div>
        <div className="space-y-6">
          <div className="h-48 animate-pulse rounded-xl border border-gray-200 bg-white shadow-sm" />
          <div className="h-48 animate-pulse rounded-xl border border-gray-200 bg-white shadow-sm" />
        </div>
      </div>
    </div>
  );
}
