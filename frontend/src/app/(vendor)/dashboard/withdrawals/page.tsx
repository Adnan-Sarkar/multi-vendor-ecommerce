import { WalletIcon } from "@phosphor-icons/react/dist/ssr";
import { formatMoney } from "@/lib/productPricing";
import {
  getVendorWithdrawals,
  getVendorBalance,
} from "@/services/withdrawalService";
import { WithdrawalsTable } from "./components/WithdrawalsTable";

interface VendorWithdrawalsPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function VendorWithdrawalsPage({
  searchParams,
}: VendorWithdrawalsPageProps) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const [{ data, meta }, balance] = await Promise.all([
    getVendorWithdrawals(currentPage),
    getVendorBalance(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Withdrawals</h1>
        <p className="mt-1 text-sm text-gray-500">
          Withdraw your earnings to your bank or bKash account. Requests are
          reviewed by an admin before payout.
        </p>
      </div>

      <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-50 text-green-600">
          <WalletIcon size={24} />
        </span>
        <div>
          <p className="text-sm font-medium text-gray-500">Available balance</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatMoney(balance)}
          </p>
        </div>
      </div>

      <WithdrawalsTable withdrawals={data} meta={meta} balance={balance} />
    </div>
  );
}
