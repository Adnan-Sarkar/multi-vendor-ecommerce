export function ProductFormSkeleton() {
  const sections = Array.from({ length: 4 });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 animate-pulse rounded-lg bg-gray-200" />
        <div className="h-8 w-52 animate-pulse rounded-lg bg-gray-200" />
      </div>

      {sections.map((_, sectionIndex) => (
        <div
          key={sectionIndex}
          className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <div className="h-5 w-40 animate-pulse rounded bg-gray-200" />
          <div className="h-11 w-full animate-pulse rounded-xl bg-gray-100" />
          <div className="h-11 w-full animate-pulse rounded-xl bg-gray-100" />
        </div>
      ))}
    </div>
  );
}
