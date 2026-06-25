"use client";

import { useActionState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPasswordAction } from "@/actions/authActions";
import { toast } from "sonner";
import Link from "next/link";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const emailParam = searchParams.get("email") || "";

  const [state, formAction, isPending] = useActionState(resetPasswordAction, null);

  useEffect(() => {
    if (isPending) {
      toast.loading("Resetting password...", { id: "auth-toast" });
    } else if (state?.success) {
      toast.success("Password reset successful! Please log in.", { id: "auth-toast" });
      router.push("/login");
    } else if (state?.error) {
      toast.error(state.error, { id: "auth-toast" });
    } else {
      toast.dismiss("auth-toast");
    }
  }, [isPending, state, router]);

  return (
    <form className="mt-8 space-y-6" action={formAction}>
      {/* Hidden input to pass the email to the Server Action */}
      <input type="hidden" name="email" value={emailParam} />

      <div className="space-y-4">
        {/* Read-only Email display */}
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">
            Resetting password for
          </label>
          <input
            type="text"
            disabled
            value={emailParam}
            className="rounded-lg w-full px-3 py-2 border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed text-sm"
          />
        </div>

        {/* OTP Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            6-Digit OTP Code
          </label>
          <input
            name="otp"
            type="text"
            maxLength={6}
            required
            defaultValue={state?.inputs?.otp || ""}
            className="rounded-lg w-full px-3 py-2 border border-gray-300 focus:outline-indigo-500 text-center tracking-widest text-lg font-bold"
            placeholder="000000"
          />
          {state?.errors?.otp && (
            <p className="text-red-500 text-xs mt-1">{state.errors.otp[0]}</p>
          )}
        </div>

        {/* New Password Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <input
            name="password"
            type="password"
            required
            className="rounded-lg w-full px-3 py-2 border border-gray-300 focus:outline-indigo-500"
            placeholder="••••••••"
          />
          {state?.errors?.password && (
            <p className="text-red-500 text-xs mt-1">{state.errors.password[0]}</p>
          )}
        </div>

        {/* Confirm New Password Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm New Password
          </label>
          <input
            name="password_confirmation"
            type="password"
            required
            className="rounded-lg w-full px-3 py-2 border border-gray-300 focus:outline-indigo-500"
            placeholder="••••••••"
          />
          {state?.errors?.password_confirmation && (
            <p className="text-red-500 text-xs mt-1">{state.errors.password_confirmation[0]}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="w-full flex justify-center py-2 px-4 text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 transition-colors cursor-pointer"
        >
          {isPending ? "Resetting..." : "Reset Password"}
        </button>

        <Link href="/login" className="text-center text-sm text-indigo-600 hover:underline">
          Back to Sign In
        </Link>
      </div>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow border border-gray-100">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Reset Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please enter the 6-digit OTP code and choose a new password.
          </p>
        </div>

        <Suspense fallback={<p className="text-center text-gray-500">Loading form...</p>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
