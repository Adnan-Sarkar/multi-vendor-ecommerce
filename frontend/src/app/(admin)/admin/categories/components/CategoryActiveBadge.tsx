interface CategoryActiveBadgeProps {
  isActive?: boolean;
}

export function CategoryActiveBadge({ isActive }: CategoryActiveBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
        isActive
          ? "border-green-200 bg-green-100 text-green-800"
          : "border-gray-300 bg-gray-100 text-gray-600"
      }`}
    >
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}
