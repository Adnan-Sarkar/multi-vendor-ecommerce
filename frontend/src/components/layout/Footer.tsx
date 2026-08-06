import Link from "next/link";
import {
  StorefrontIcon,
  FacebookLogoIcon,
  InstagramLogoIcon,
  XLogoIcon,
  LinkedinLogoIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react/dist/ssr";

const marketplaceLinks = [
  { label: "All Products", href: "/shop" },
  { label: "Categories", href: "/categories" },
  { label: "Browse Stores", href: "/vendors" },
  { label: "Sell on MultiVendor", href: "/register-vendor" },
];

const accountLinks = [
  { label: "Sign In", href: "/login" },
  { label: "Create Account", href: "/register" },
  { label: "My Orders", href: "/orders" },
  { label: "Wishlist", href: "/wishlist" },
];

const supportLinks = ["Contact Us", "FAQ", "Shipping Info", "Returns & Refunds"];

const socialIcons = [
  { label: "Facebook", icon: <FacebookLogoIcon size={18} weight="fill" /> },
  { label: "Instagram", icon: <InstagramLogoIcon size={18} weight="fill" /> },
  { label: "X", icon: <XLogoIcon size={18} weight="fill" /> },
  { label: "LinkedIn", icon: <LinkedinLogoIcon size={18} weight="fill" /> },
  { label: "YouTube", icon: <YoutubeLogoIcon size={18} weight="fill" /> },
];

const legalLinks = ["Privacy Policy", "Terms of Service", "Cookie Settings"];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-900">
        {title}
      </h4>
      <ul className="space-y-3 text-sm">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="cursor-pointer text-gray-500 transition-colors hover:text-indigo-600"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="container mx-auto max-w-7xl px-4 py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2">
            <Link
              href="/"
              className="cursor-pointer text-xl font-bold tracking-tight text-indigo-600"
            >
              MultiVendor
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-500">
              The premier marketplace for top-quality products from trusted
              vendors worldwide.
            </p>

            <div className="mt-6 flex items-center gap-2">
              {socialIcons.map((social) => (
                <button
                  key={social.label}
                  type="button"
                  aria-label={social.label}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-indigo-600 hover:text-white"
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>

          <FooterColumn title="Marketplace" links={marketplaceLinks} />
          <FooterColumn title="Account" links={accountLinks} />

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-900">
              Support
            </h4>
            <ul className="space-y-3 text-sm">
              {supportLinks.map((label) => (
                <li key={label}>
                  <button
                    type="button"
                    className="cursor-pointer text-left text-gray-500 transition-colors hover:text-indigo-600"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-gray-100 pt-8 sm:flex-row sm:justify-between">
          <p className="flex items-center gap-1.5 text-sm text-gray-400">
            <StorefrontIcon size={16} className="text-indigo-600" />
            © {new Date().getFullYear()} MultiVendor E-Commerce. All rights
            reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {legalLinks.map((label) => (
              <button
                key={label}
                type="button"
                className="cursor-pointer text-sm text-gray-400 transition-colors hover:text-indigo-600"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
