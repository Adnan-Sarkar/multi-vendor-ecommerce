import { getPendingWithdrawals } from "@/services/withdrawalService";
import { AdminWithdrawalsTable } from "./components/AdminWithdrawalsTable";
import { WithdrawalStatusTabs } from "./components/WithdrawalStatusTabs";

interface AdminWithdrawalsPageProps {
  searchParams: Promise<{ page?: string; status?: string }>;
}

const ALLOWED_STATUSES = ["pending", "approved", "rejected"];

export default async function AdminWithdrawalsPage({
  searchParams,
}: AdminWithdrawalsPageProps) {
  const { page, status } = await searchParams;
  const currentPage = Number(page) || 1;
  const activeStatus =
    status && ALLOWED_STATUSES.includes(status) ? status : "";

  const { data, meta } = await getPendingWithdrawals(currentPage, activeStatus);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Withdrawals</h1>
        <p className="mt-1 text-sm text-gray-500">
          Review vendor payout requests. Approving deducts the amount from the
          vendor&apos;s balance.
        </p>
      </div>

      <WithdrawalStatusTabs activeStatus={activeStatus} />

      <AdminWithdrawalsTable withdrawals={data} meta={meta} />
    </div>
  );
}
