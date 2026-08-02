import type { WithdrawalStatus } from "@/services/withdrawalService";

type Tone = "amber" | "green" | "red";

const TONES: Record<Tone, string> = {
  amber: "bg-amber-50 text-amber-700 ring-amber-600/20",
  green: "bg-green-50 text-green-700 ring-green-600/20",
  red: "bg-red-50 text-red-700 ring-red-600/20",
};

const STATUS: Record<WithdrawalStatus, { label: string; tone: Tone }> = {
  pending: { label: "Pending", tone: "amber" },
  approved: { label: "Approved", tone: "green" },
  rejected: { label: "Rejected", tone: "red" },
};

interface WithdrawalStatusBadgeProps {
  status: WithdrawalStatus;
}

export function WithdrawalStatusBadge({ status }: WithdrawalStatusBadgeProps) {
  const resolved = STATUS[status] ?? {
    label: status,
    tone: "amber" as Tone,
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${TONES[resolved.tone]}`}
    >
      {resolved.label}
    </span>
  );
}
