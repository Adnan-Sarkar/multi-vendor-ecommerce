"use client";

import { CreditCardIcon, MoneyIcon } from "@phosphor-icons/react";

export type PaymentMethod = "sslcommerz" | "cod";

interface PaymentMethodSelectorProps {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
}

const OPTIONS: {
  value: PaymentMethod;
  label: string;
  description: string;
  icon: typeof CreditCardIcon;
}[] = [
  {
    value: "sslcommerz",
    label: "Card / Online payment",
    description: "Pay securely via the SSLCommerz gateway.",
    icon: CreditCardIcon,
  },
  {
    value: "cod",
    label: "Cash on delivery",
    description: "Pay with cash when your order arrives.",
    icon: MoneyIcon,
  },
];

export function PaymentMethodSelector({
  value,
  onChange,
}: PaymentMethodSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {OPTIONS.map((option) => {
        const isSelected = option.value === value;
        const Icon = option.icon;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 text-left transition-all ${
              isSelected
                ? "border-indigo-500 bg-indigo-50/40 ring-1 ring-indigo-200"
                : "border-gray-200 bg-white hover:border-indigo-200"
            }`}
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                isSelected
                  ? "bg-indigo-100 text-indigo-600"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              <Icon size={20} weight="fill" />
            </span>
            <div>
              <p className="font-semibold text-gray-900">{option.label}</p>
              <p className="mt-0.5 text-xs text-gray-500">
                {option.description}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
