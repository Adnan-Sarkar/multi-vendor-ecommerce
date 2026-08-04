import { StarIcon } from "@phosphor-icons/react/dist/ssr";
import type { RatingCount } from "@/services/adminDashboardService";

interface RatingBarsProps {
  data: RatingCount[];
  average: number;
}

export function RatingBars({ data, average }: RatingBarsProps) {
  const totalReviews = data.reduce((sum, entry) => sum + entry.count, 0);

  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
      <div className="flex flex-col items-center justify-center sm:w-32 sm:shrink-0">
        <span className="text-4xl font-bold text-gray-900">
          {average.toFixed(1)}
        </span>
        <span className="mt-1 flex items-center gap-1 text-amber-500">
          <StarIcon size={16} weight="fill" />
        </span>
        <span className="mt-1 text-xs text-gray-400">
          {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
        </span>
      </div>

      <ul className="w-full min-w-0 flex-1 space-y-2">
        {data.map((entry) => {
          const percentage =
            totalReviews > 0 ? (entry.count / totalReviews) * 100 : 0;

          return (
            <li key={entry.rating} className="flex items-center gap-3 text-sm">
              <span className="flex w-8 shrink-0 items-center gap-0.5 text-gray-500">
                {entry.rating}
                <StarIcon size={12} weight="fill" className="text-amber-400" />
              </span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-amber-400"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="w-8 shrink-0 text-right tabular-nums text-gray-500">
                {entry.count}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
