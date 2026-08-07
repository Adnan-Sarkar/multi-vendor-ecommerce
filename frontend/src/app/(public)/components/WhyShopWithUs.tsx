import {
  TruckIcon,
  ShieldCheckIcon,
  SealCheckIcon,
  ArrowsClockwiseIcon,
} from "@phosphor-icons/react/dist/ssr";

const features = [
  {
    icon: <TruckIcon size={26} />,
    title: "Fast Delivery",
    description: "Orders are shipped quickly and tracked to your door.",
  },
  {
    icon: <ShieldCheckIcon size={26} />,
    title: "Secure Payments",
    description: "Pay safely online or choose cash on delivery.",
  },
  {
    icon: <SealCheckIcon size={26} />,
    title: "Verified Vendors",
    description: "Every shop is reviewed and approved before selling.",
  },
  {
    icon: <ArrowsClockwiseIcon size={26} />,
    title: "Easy Returns",
    description: "Simple returns and refunds if something is not right.",
  },
];

export function WhyShopWithUs() {
  return (
    <section className="bg-gray-50 pb-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Why shop with us
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            A marketplace built around trust and convenience
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 text-center"
            >
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                {feature.icon}
              </span>
              <h3 className="mt-4 text-base font-bold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
