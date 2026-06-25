"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { forgotPasswordAction } from "@/actions/authActions";
import { toast } from "sonner";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(forgotPasswordAction, null);

  useEffect(() => {
    if (isPending) {
      toast.loading("Sending OTP...", { id: "auth-toast" });
    } else if (state?.success) {
      toast.success("OTP sent to your email!", { id: "auth-toast" });

      router.push(`/reset-password?email=${encodeURIComponent(state.email as string)}`);
    } else if (state?.error) {
      toast.error(state.error, { id: "auth-toast" });
    } else {
      toast.dismiss("auth-toast");
    }
  }, [isPending, state, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow border border-gray-100">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Forgot Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email and we will send you a 6-digit OTP code.
          </p>
        </div>

        <form className="mt-8 space-y-6" action={formAction}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                defaultValue={state?.inputs?.email || ""}
                className="rounded-lg w-full px-3 py-2 border border-gray-300 focus:outline-indigo-500"
                placeholder="you@example.com"
              />
              {state?.errors?.email && (
                <p className="text-red-500 text-xs mt-1">{state.errors.email[0]}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex justify-center py-2 px-4 text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 transition-colors cursor-pointer"
            >
              {isPending ? "Sending..." : "Send OTP"}
            </button>

            <Link href="/login" className="text-center text-sm text-indigo-600 hover:underline">
              Back to Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
