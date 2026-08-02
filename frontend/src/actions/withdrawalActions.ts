"use server";

import { revalidatePath } from "next/cache";
import { fetchServer } from "@/lib/api-server";

export interface WithdrawalFormState {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export interface WithdrawalActionResult {
  success: boolean;
  message: string;
}

function readText(formData: FormData, field: string): string {
  return String(formData.get(field) ?? "").trim();
}

export async function requestWithdrawalAction(
  _previousState: WithdrawalFormState | null,
  formData: FormData,
): Promise<WithdrawalFormState> {
  const method = readText(formData, "method");

  const accountDetails: Record<string, string> = {
    account_number: readText(formData, "account_number"),
    account_name: readText(formData, "account_name"),
  };

  if (method === "bank") {
    accountDetails.bank_name = readText(formData, "bank_name");
    accountDetails.branch_name = readText(formData, "branch_name");

    const routingNumber = readText(formData, "routing_number");
    if (routingNumber) {
      accountDetails.routing_number = routingNumber;
    }
  }

  const payload = {
    amount: readText(formData, "amount"),
    method,
    account_details: accountDetails,
  };

  const response = await fetchServer("/vendor/withdrawals", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    return {
      success: false,
      message: body?.message ?? "Failed to request withdrawal.",
      errors: body?.errors,
    };
  }

  revalidatePath("/dashboard/withdrawals");

  return {
    success: true,
    message: body?.message ?? "Withdrawal request submitted.",
  };
}

export async function approveWithdrawalAction(
  withdrawalId: number,
): Promise<WithdrawalActionResult> {
  const response = await fetchServer(
    `/admin/withdrawals/${withdrawalId}/approve`,
    {
      method: "POST",
    },
  );

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    return {
      success: false,
      message: body?.message ?? "Failed to approve withdrawal.",
    };
  }

  revalidatePath("/admin/withdrawals");

  return {
    success: true,
    message: body?.message ?? "Withdrawal approved successfully.",
  };
}

export async function rejectWithdrawalAction(
  withdrawalId: number,
  note: string,
): Promise<WithdrawalActionResult> {
  const response = await fetchServer(
    `/admin/withdrawals/${withdrawalId}/reject`,
    {
      method: "POST",
      body: JSON.stringify({ note }),
    },
  );

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    return {
      success: false,
      message: body?.message ?? "Failed to reject withdrawal.",
    };
  }

  revalidatePath("/admin/withdrawals");

  return {
    success: true,
    message: body?.message ?? "Withdrawal rejected successfully.",
  };
}
