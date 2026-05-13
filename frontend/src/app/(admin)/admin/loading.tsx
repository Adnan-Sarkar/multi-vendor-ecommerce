export default function AdminLoading() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-28 bg-white rounded-xl border border-gray-200 shadow-sm animate-pulse" />
        ))}
      </div>
      <div className="h-64 bg-white rounded-xl border border-gray-200 shadow-sm animate-pulse" />
    </div>
  );
}
