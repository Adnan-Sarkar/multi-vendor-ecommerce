import { WarningCircle } from "@phosphor-icons/react";

export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm text-red-700">
      <WarningCircle size={18} weight="fill" className="mt-0.5 flex-none text-red-500" />
      <span>{message}</span>
    </div>
  );
}
