export default function OrdersLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
        <div className="h-10 w-24 bg-gray-100 rounded-lg animate-pulse" />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="h-14 bg-gray-50 border-b border-gray-200 animate-pulse" />
        <div className="divide-y divide-gray-100">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 bg-white animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
