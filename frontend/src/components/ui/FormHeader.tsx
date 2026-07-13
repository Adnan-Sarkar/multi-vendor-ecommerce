import type { Icon } from "@phosphor-icons/react";

type FormHeaderProps = {
  icon?: Icon;
  title: string;
  subtitle?: string;
  showBrand?: boolean;
  brandName?: string;
};

export function FormHeader({ icon: HeaderIcon, title, subtitle, showBrand, brandName = "MultiVendor" }: FormHeaderProps) {
  return (
    <div className="mb-8">
      {showBrand && HeaderIcon && (
        <div className="mb-6 flex items-center gap-2 lg:hidden">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/30">
            <HeaderIcon size={20} weight="fill" />
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-900">{brandName}</span>
        </div>
      )}

      {HeaderIcon && (
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/30">
          <HeaderIcon size={26} weight="fill" />
        </div>
      )}

      <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">{title}</h1>
      {subtitle && <p className="mt-2 text-sm leading-relaxed text-slate-500">{subtitle}</p>}
    </div>
  );
}
