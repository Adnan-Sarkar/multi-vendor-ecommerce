type Status = "pending" | "approved" | "rejected" | "suspended";

const STATUS_STYLES: Record<Status, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  approved: "bg-green-100 text-green-800 border-green-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
  suspended: "bg-gray-200 text-gray-700 border-gray-300",
};

const STATUS_LABELS: Record<Status, string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
  suspended: "Suspended",
};

export function StatusBadge({ status, label }: { status: string; label?: string }) {
  const key = (status as Status) in STATUS_STYLES ? (status as Status) : "pending";
  const style = STATUS_STYLES[key];
  const text = label ?? STATUS_LABELS[key];

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${style}`}
    >
      {text}
    </span>
  );
}
