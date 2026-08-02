import type {
  WithdrawalMethod,
  WithdrawalAccountDetails,
} from "@/services/withdrawalService";

const METHOD_LABELS: Record<WithdrawalMethod, string> = {
  bank: "Bank transfer",
  bkash: "bKash",
};

export function formatWithdrawalMethod(method: WithdrawalMethod): string {
  return METHOD_LABELS[method] ?? method;
}

export function formatAccountSummary(
  details: WithdrawalAccountDetails,
): string {
  return [details.account_name, details.account_number]
    .filter(Boolean)
    .join(" · ");
}

export function formatWithdrawalDate(value?: string | null): string {
  if (!value) {
    return "—";
  }

  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
