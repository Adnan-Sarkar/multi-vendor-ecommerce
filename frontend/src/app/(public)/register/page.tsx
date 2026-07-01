"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { registerAction } from "@/actions/authActions";
import Link from "next/link";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(registerAction, null);

  useEffect(() => {
    if (isPending) {
      toast.loading("Creating account...", { id: "auth-toast" });
    } else if (state?.success) {
      toast.success("Account created!", { id: "auth-toast" });
      router.push("/");
      router.refresh();
    } else if (state?.error) {
      toast.error(state.error, { id: "auth-toast" });
    } else {
      toast.dismiss("auth-toast");
    }
  }, [isPending, state, router]);


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4">
      {/* Main white form card */}
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow border border-gray-100">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" action={formAction}>
          {state?.error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
              {state.error}
            </div>
          )}

          <div className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                required
                defaultValue={state?.inputs?.name as string || ""}
                className="rounded-lg w-full px-3 py-2 border border-gray-300 focus:outline-indigo-500"
                placeholder="John Doe"
              />
              {state?.errors?.name && (
                <p className="text-red-500 text-xs mt-1">{state.errors.name[0]}</p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                defaultValue={state?.inputs?.email as string || ""}
                className="rounded-lg w-full px-3 py-2 border border-gray-300 focus:outline-indigo-500"
                placeholder="you@example.com"
              />
              {state?.errors?.email && (
                <p className="text-red-500 text-xs mt-1">{state.errors.email[0]}</p>
              )}
            </div>

            {/* Phone Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                name="phone"
                type="text"
                required
                defaultValue={state?.inputs?.phone as string || ""}
                className="rounded-lg w-full px-3 py-2 border border-gray-300 focus:outline-indigo-500"
                placeholder="01712345678"
              />
              {state?.errors?.phone && (
                <p className="text-red-500 text-xs mt-1">{state.errors.phone[0]}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                defaultValue={state?.inputs?.password as string || ""}
                className="rounded-lg w-full px-3 py-2 border border-gray-300 focus:outline-indigo-500"
                placeholder="••••••••"
              />
              {state?.errors?.password && (
                <p className="text-red-500 text-xs mt-1">{state.errors.password[0]}</p>
              )}
            </div>

            {/* Password Confirmation Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                name="password_confirmation"
                type="password"
                required
                defaultValue={state?.inputs?.password_confirmation as string || ""}
                className="rounded-lg w-full px-3 py-2 border border-gray-300 focus:outline-indigo-500"
                placeholder="••••••••"
              />
              {state?.errors?.password_confirmation && (
                <p className="text-red-500 text-xs mt-1">{state.errors.password_confirmation[0]}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex justify-center py-3 px-4 text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 transition-colors cursor-pointer"
            >
              {isPending ? "Creating account..." : "Register"}
            </button>
          </div>
        </form>
      </div>

      <div className="max-w-md w-full space-y-4 mt-4 animate-fade-in">
        {/* Become a Vendor */}
        <div className="bg-indigo-50 border border-indigo-100/80 p-4 rounded-xl flex items-center justify-center gap-2 shadow-sm">
          <span className="text-sm text-indigo-900">
            Want to sell products on our platform?
          </span>
          <Link
            href="/register-vendor"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center gap-1"
          >
            Become a Vendor &rarr;
          </Link>
        </div>

        {/* Redirect to Login */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
