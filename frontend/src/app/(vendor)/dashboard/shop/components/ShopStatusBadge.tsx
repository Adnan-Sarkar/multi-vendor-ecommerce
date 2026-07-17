type Status = "pending" | "approved" | "rejected" | "suspended";

const STATUS_STYLES: Record<Status, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  suspended: "bg-gray-200 text-gray-700",
};

const STATUS_LABELS: Record<Status, string> = {
  pending: "Pending Review",
  approved: "Approved",
  rejected: "Rejected",
  suspended: "Suspended",
};

export function ShopStatusBadge({ status }: { status: Status }) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.pending;
  const label = STATUS_LABELS[status] ?? status;

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${style}`}>
      {label}
    </span>
  );
}
