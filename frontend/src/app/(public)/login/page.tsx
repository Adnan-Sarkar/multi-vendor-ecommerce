"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/actions/authActions";
import Link from "next/link";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(loginAction, null);

  useEffect(() => {
    if (isPending) {
      toast.loading("Signing in...", { id: "auth-toast" });
    } else if (state?.success) {
      toast.success("Login successful!", { id: "auth-toast" });
      
      if (state.role === "vendor") {
        router.push("/dashboard");
      } else if (state.role === "admin" || state.role === "super_admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
      router.refresh();
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
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              create a customer account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" action={formAction}>
          {state?.error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
              {state.error}
            </div>
          )}

          <div className="space-y-4">
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
              {/* Show Zod Email Validation Error */}
              {state?.errors?.email && (
                <p className="text-red-500 text-xs mt-1">{state.errors.email[0]}</p>
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
              {/* Show Zod Password Validation Error */}
              {state?.errors?.password && (
                <p className="text-red-500 text-xs mt-1">{state.errors.password[0]}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex justify-center py-2 px-4 text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 transition-colors"
            >
              {isPending ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
