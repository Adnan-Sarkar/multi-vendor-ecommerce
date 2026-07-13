import { useId, type TextareaHTMLAttributes } from "react";
import type { Icon } from "@phosphor-icons/react";

type TextareaProps = {
  label?: string;
  icon?: Icon;
  error?: string;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className">;

export function Textarea({ label, icon: LeadingIcon, error, ...rest }: TextareaProps) {
  const autoId = useId();
  const id = rest.id ?? autoId;

  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <div className="group relative">
        {LeadingIcon && (
          <span className="pointer-events-none absolute left-3.5 top-3 text-slate-400 transition-colors group-focus-within:text-indigo-600">
            <LeadingIcon size={18} weight="regular" />
          </span>
        )}
        <textarea
          {...rest}
          id={id}
          aria-invalid={error ? true : undefined}
          className={`w-full rounded-xl border bg-white/70 py-2.5 ${LeadingIcon ? "pl-11" : "pl-3.5"} pr-3.5 text-sm text-slate-900 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/15 ${
            error ? "border-red-300 focus:border-red-500 focus:ring-red-500/15" : "border-slate-200"
          }`}
        />
      </div>
      {error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}
