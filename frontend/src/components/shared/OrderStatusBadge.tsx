type Tone = "gray" | "blue" | "amber" | "green" | "red";

const TONES: Record<Tone, string> = {
  gray: "bg-gray-100 text-gray-600 ring-gray-500/20",
  blue: "bg-blue-50 text-blue-700 ring-blue-600/20",
  amber: "bg-amber-50 text-amber-700 ring-amber-600/20",
  green: "bg-green-50 text-green-700 ring-green-600/20",
  red: "bg-red-50 text-red-700 ring-red-600/20",
};

const ORDER_STATUS: Record<string, { label: string; tone: Tone }> = {
  pending: { label: "Pending", tone: "amber" },
  confirmed: { label: "Confirmed", tone: "blue" },
  processing: { label: "Processing", tone: "blue" },
  shipped: { label: "Shipped", tone: "blue" },
  delivered: { label: "Delivered", tone: "green" },
  cancelled: { label: "Cancelled", tone: "red" },
};

const PAYMENT_STATUS: Record<string, { label: string; tone: Tone }> = {
  pending: { label: "Payment pending", tone: "amber" },
  paid: { label: "Paid", tone: "green" },
  failed: { label: "Payment failed", tone: "red" },
};

interface OrderStatusBadgeProps {
  status: string;
  kind?: "order" | "payment";
}

export function OrderStatusBadge({ status, kind = "order" }: OrderStatusBadgeProps) {
  const map = kind === "payment" ? PAYMENT_STATUS : ORDER_STATUS;
  const resolved = map[status] ?? {
    label: status.charAt(0).toUpperCase() + status.slice(1),
    tone: "gray" as Tone,
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${TONES[resolved.tone]}`}
    >
      {resolved.label}
    </span>
  );
}
