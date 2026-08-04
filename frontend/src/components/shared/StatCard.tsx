import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRightIcon,
  TrendUpIcon,
  TrendDownIcon,
} from "@phosphor-icons/react/dist/ssr";

type Tone = "green" | "indigo" | "amber" | "purple" | "blue" | "gray";

const TONES: Record<Tone, string> = {
  green: "bg-green-50 text-green-600",
  indigo: "bg-indigo-50 text-indigo-600",
  amber: "bg-amber-50 text-amber-600",
  purple: "bg-purple-50 text-purple-600",
  blue: "bg-blue-50 text-blue-600",
  gray: "bg-gray-100 text-gray-600",
};

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  subtitle: string;
  tone: Tone;
  href?: string;
  delta?: number | null;
}

function DeltaBadge({ delta }: { delta: number }) {
  const isPositive = delta >= 0;

  return (
    <span
      className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-semibold ${
        isPositive
          ? "bg-green-50 text-green-600"
          : "bg-red-50 text-red-600"
      }`}
    >
      {isPositive ? (
        <TrendUpIcon size={12} weight="bold" />
      ) : (
        <TrendDownIcon size={12} weight="bold" />
      )}
      {Math.abs(delta)}%
    </span>
  );
}

function CardBody({
  title,
  value,
  icon,
  subtitle,
  tone,
  href,
  delta,
}: StatCardProps) {
  return (
    <>
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${TONES[tone]}`}
        >
          {icon}
        </span>
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900">
            {value}
          </h3>
          {delta !== null && delta !== undefined && <DeltaBadge delta={delta} />}
        </div>
        <p className="mt-1 flex items-center gap-1 text-xs font-medium text-gray-400">
          {subtitle}
          {href && <ArrowRightIcon size={12} weight="bold" />}
        </p>
      </div>
    </>
  );
}

export function StatCard(props: StatCardProps) {
  const baseClassName =
    "flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md";

  if (props.href) {
    return (
      <Link
        href={props.href}
        className={`${baseClassName} cursor-pointer hover:border-indigo-200`}
      >
        <CardBody {...props} />
      </Link>
    );
  }

  return (
    <div className={baseClassName}>
      <CardBody {...props} />
    </div>
  );
}
