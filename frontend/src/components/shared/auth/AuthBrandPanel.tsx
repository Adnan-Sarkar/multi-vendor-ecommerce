import Link from "next/link";
import { Storefront, ShieldCheck, Truck, Sparkle } from "@phosphor-icons/react/dist/ssr";

type Feature = {
  icon: "shield" | "truck" | "sparkle" | "store";
  title: string;
  description: string;
};

const ICONS = {
  shield: ShieldCheck,
  truck: Truck,
  sparkle: Sparkle,
  store: Storefront,
} as const;

type AuthBrandPanelProps = {
  eyebrow: string;
  heading: string;
  subheading: string;
  features: Feature[];
};

export function AuthBrandPanel({ eyebrow, heading, subheading, features }: AuthBrandPanelProps) {
  return (
    <div className="relative hidden w-full overflow-hidden bg-linear-to-br from-indigo-600 via-violet-600 to-fuchsia-600 lg:flex lg:flex-col lg:justify-between lg:p-12">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -right-16 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
        <div className="absolute bottom-0 -left-20 h-72 w-72 rounded-full bg-fuchsia-300/20 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />
      </div>

      <Link href="/" className="relative z-10 inline-flex items-center gap-2 text-white">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm ring-1 ring-white/30">
          <Storefront size={22} weight="fill" />
        </span>
        <span className="text-xl font-bold tracking-tight">MultiVendor</span>
      </Link>

      <div className="relative z-10 max-w-md">
        <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/90 ring-1 ring-white/25 backdrop-blur-sm">
          {eyebrow}
        </span>
        <h2 className="mt-5 text-4xl font-extrabold leading-tight text-white">{heading}</h2>
        <p className="mt-4 text-base leading-relaxed text-indigo-100">{subheading}</p>
      </div>

      <ul className="relative z-10 space-y-4">
        {features.map((feature) => {
          const FeatureIcon = ICONS[feature.icon];
          return (
            <li key={feature.title} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-sm">
                <FeatureIcon size={18} weight="bold" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">{feature.title}</p>
                <p className="text-sm text-indigo-100/80">{feature.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
