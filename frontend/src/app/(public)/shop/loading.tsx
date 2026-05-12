export default function ShopLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="h-9 w-48 bg-gray-200 rounded animate-pulse mb-8" />
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-64 flex-shrink-0 space-y-8">
          <div className="h-32 bg-gray-100 rounded-xl animate-pulse" />
          <div className="h-32 bg-gray-100 rounded-xl animate-pulse" />
        </div>
        <div className="flex-1">
          <div className="mb-6 flex justify-between">
            <div className="h-5 w-32 bg-gray-100 rounded animate-pulse" />
            <div className="h-9 w-40 bg-gray-100 rounded-lg animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-gray-50 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
