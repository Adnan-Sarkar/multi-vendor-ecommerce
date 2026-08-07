import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
}

export function SectionHeading({
  title,
  subtitle,
  viewAllHref,
}: SectionHeadingProps) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {title}
        </h2>
        {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
      </div>

      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="flex shrink-0 cursor-pointer items-center gap-1 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-700"
        >
          View all
          <ArrowRightIcon size={15} weight="bold" />
        </Link>
      )}
    </div>
  );
}
