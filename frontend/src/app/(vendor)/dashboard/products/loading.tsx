export default function ProductsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
        <div className="h-10 w-36 bg-indigo-100 rounded-lg animate-pulse" />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="h-14 bg-gray-50 border-b border-gray-200 animate-pulse" />
        <div className="divide-y divide-gray-100">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 bg-white animate-pulse flex items-center px-6 gap-4">
               <div className="h-12 w-12 bg-gray-100 rounded-lg flex-shrink-0" />
               <div className="space-y-2 flex-1">
                 <div className="h-4 w-48 bg-gray-200 rounded" />
                 <div className="h-3 w-24 bg-gray-100 rounded" />
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

