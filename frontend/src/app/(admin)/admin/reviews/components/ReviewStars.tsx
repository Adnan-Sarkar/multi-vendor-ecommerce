import { StarIcon } from "@phosphor-icons/react/dist/ssr";

export function ReviewStars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((value) => (
        <StarIcon
          key={value}
          size={15}
          weight={value <= rating ? "fill" : "regular"}
          className={value <= rating ? "text-amber-400" : "text-gray-300"}
        />
      ))}
    </span>
  );
}
