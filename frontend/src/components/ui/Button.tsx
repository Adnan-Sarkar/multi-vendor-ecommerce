import type { ButtonHTMLAttributes, ReactNode } from "react";
import { CircleNotch } from "@phosphor-icons/react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  pending?: boolean;
  pendingLabel?: string;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const VARIANTS: Record<Variant, string> = {
  primary:
    "overflow-hidden bg-linear-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 hover:brightness-110 focus:ring-indigo-500/30 disabled:hover:brightness-100",
  secondary: "bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-900/20",
  outline: "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300/40",
  ghost: "text-slate-700 hover:bg-slate-100 focus:ring-slate-200",
};

const SIZES: Record<Size, string> = {
  sm: "gap-1.5 px-3.5 py-2 text-xs",
  md: "gap-2 px-4 py-2.5 text-sm",
  lg: "gap-2 px-5 py-3 text-sm",
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  pending = false,
  pendingLabel,
  children,
  className,
  disabled,
  ...rest
}: ButtonProps) {
  const classes = [
    "group relative inline-flex items-center justify-center rounded-xl font-semibold transition-all focus:outline-none focus:ring-4 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70",
    VARIANTS[variant],
    SIZES[size],
    fullWidth ? "w-full" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button {...rest} disabled={disabled || pending} className={classes}>
      {variant === "primary" && (
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
        />
      )}
      {pending ? (
        <>
          <CircleNotch size={18} weight="bold" className="animate-spin" />
          {pendingLabel ?? children}
        </>
      ) : (
        children
      )}
    </button>
  );
}
