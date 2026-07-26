import { StarIcon } from "@phosphor-icons/react/dist/ssr";

interface StarRatingProps {
  rating: number;
  size?: number;
}

const TOTAL_STARS = 5;

export function StarRating({ rating, size = 16 }: StarRatingProps) {
  const roundedRating = Math.round(rating);

  return (
    <div className="flex items-center gap-0.5 text-amber-400">
      {Array.from({ length: TOTAL_STARS }, (_, index) => (
        <StarIcon
          key={index}
          size={size}
          weight={index < roundedRating ? "fill" : "regular"}
        />
      ))}
    </div>
  );
}
