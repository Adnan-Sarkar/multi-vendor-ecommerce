export default function ProductLoading() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="aspect-square bg-gray-100 rounded-2xl animate-pulse" />
        <div className="flex flex-col gap-4">
          <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
          <div className="h-10 w-3/4 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 w-32 bg-gray-100 rounded animate-pulse" />
          <div className="h-24 w-full bg-gray-50 rounded animate-pulse mt-4" />
          <div className="h-12 w-full bg-gray-100 rounded-lg animate-pulse mt-8" />
        </div>
      </div>
    </div>
  );
}
