"use client";

import { useId, useState, type InputHTMLAttributes, type ReactNode } from "react";
import type { Icon } from "@phosphor-icons/react";
import { Eye, EyeSlash } from "@phosphor-icons/react";

type InputProps = {
  label?: string;
  icon?: Icon;
  error?: string;
  labelAction?: ReactNode;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "className">;

export function Input({ label, icon: LeadingIcon, error, labelAction, type = "text", ...rest }: InputProps) {
  const autoId = useId();
  const id = rest.id ?? autoId;
  const isPassword = type === "password";
  const [reveal, setReveal] = useState(false);
  const resolvedType = isPassword && reveal ? "text" : type;

  return (
    <div>
      {(label || labelAction) && (
        <div className="mb-1.5 flex items-center justify-between">
          {label ? (
            <label htmlFor={id} className="block text-sm font-medium text-slate-700">
              {label}
            </label>
          ) : (
            <span />
          )}
          {labelAction}
        </div>
      )}

      <div className="group relative">
        {LeadingIcon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-indigo-600">
            <LeadingIcon size={18} weight="regular" />
          </span>
        )}

        <input
          {...rest}
          id={id}
          type={resolvedType}
          aria-invalid={error ? true : undefined}
          className={`w-full rounded-xl border bg-white/70 py-2.5 ${LeadingIcon ? "pl-11" : "pl-3.5"} ${
            isPassword ? "pr-11" : "pr-3.5"
          } text-sm text-slate-900 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/15 ${
            error ? "border-red-300 focus:border-red-500 focus:ring-red-500/15" : "border-slate-200"
          }`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setReveal((v) => !v)}
            tabIndex={-1}
            aria-label={reveal ? "Hide password" : "Show password"}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-slate-400 transition-colors hover:text-indigo-600"
          >
            {reveal ? <EyeSlash size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}
