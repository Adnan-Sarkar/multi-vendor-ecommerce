"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { registerVendorAction } from "@/actions/registerVendorAction";
import { toast } from "sonner";
import Link from "next/link";

export default function RegisterVendorPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(registerVendorAction, null);

  useEffect(() => {
    if (isPending) {
      toast.loading("Submitting vendor application...", { id: "auth-toast" });
    } else if (state?.success) {
      toast.success("Registration successful! Accessing dashboard...", { id: "auth-toast" });
      router.push("/dashboard");
      router.refresh();
    } else if (state?.error) {
      toast.error(state.error, { id: "auth-toast" });
    } else {
      toast.dismiss("auth-toast");
    }
  }, [isPending, state, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 gap-4">
      {/* Main Form Card */}
      <div className="max-w-2xl w-full space-y-8 bg-white p-8 rounded-2xl shadow border border-gray-100">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Register as a Vendor
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Set up your shop and start selling on our platform.
          </p>
        </div>

        <form className="mt-8 space-y-6" action={formAction}>
          {/* Personal Details */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">
              Personal Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  name="name"
                  type="text"
                  required
                  defaultValue={state?.inputs?.name || ""}
                  className="rounded-lg w-full px-3 py-2 border border-gray-300 focus:outline-indigo-500"
                  placeholder="John Doe"
                />
                {state?.errors?.name && (
                  <p className="text-red-500 text-xs mt-1">{state.errors.name[0]}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  name="email"
                  type="email"
                  required
                  defaultValue={state?.inputs?.email || ""}
                  className="rounded-lg w-full px-3 py-2 border border-gray-300 focus:outline-indigo-500"
                  placeholder="vendor@example.com"
                />
                {state?.errors?.email && (
                  <p className="text-red-500 text-xs mt-1">{state.errors.email[0]}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  name="phone"
                  type="text"
                  required
                  defaultValue={state?.inputs?.phone || ""}
                  className="rounded-lg w-full px-3 py-2 border border-gray-300 focus:outline-indigo-500"
                  placeholder="01712345678"
                />
                {state?.errors?.phone && (
                  <p className="text-red-500 text-xs mt-1">{state.errors.phone[0]}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
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

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
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
          </div>

          {/* Shop Details */}
          <div className="pt-6">
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">
              Shop Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Shop Name</label>
                <input
                  name="shop_name"
                  type="text"
                  required
                  defaultValue={state?.inputs?.shop_name || ""}
                  className="rounded-lg w-full px-3 py-2 border border-gray-300 focus:outline-indigo-500"
                  placeholder="Super Fast Tech"
                />
                {state?.errors?.shop_name && (
                  <p className="text-red-500 text-xs mt-1">{state.errors.shop_name[0]}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Shop Description</label>
                <textarea
                  name="description"
                  required
                  defaultValue={state?.inputs?.description || ""}
                  rows={3}
                  className="rounded-lg w-full px-3 py-2 border border-gray-300 focus:outline-indigo-500 text-sm"
                  placeholder="Briefly describe what your shop sells..."
                />
                {state?.errors?.description && (
                  <p className="text-red-500 text-xs mt-1">{state.errors.description[0]}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Shop Address</label>
                <input
                  name="address"
                  type="text"
                  required
                  defaultValue={state?.inputs?.address || ""}
                  className="rounded-lg w-full px-3 py-2 border border-gray-300 focus:outline-indigo-500"
                  placeholder="123 Shop Street"
                />
                {state?.errors?.address && (
                  <p className="text-red-500 text-xs mt-1">{state.errors.address[0]}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    name="city"
                    type="text"
                    required
                    defaultValue={state?.inputs?.city || ""}
                    className="rounded-lg w-full px-3 py-2 border border-gray-300 focus:outline-indigo-500"
                    placeholder="Dhaka"
                  />
                  {state?.errors?.city && (
                    <p className="text-red-500 text-xs mt-1">{state.errors.city[0]}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State / Division</label>
                  <input
                    name="state"
                    type="text"
                    required
                    defaultValue={state?.inputs?.state || ""}
                    className="rounded-lg w-full px-3 py-2 border border-gray-300 focus:outline-indigo-500"
                    placeholder="Dhaka Division"
                  />
                  {state?.errors?.state && (
                    <p className="text-red-500 text-xs mt-1">{state.errors.state[0]}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex justify-center py-3 px-4 text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 transition-colors cursor-pointer"
            >
              {isPending ? "Creating vendor account..." : "Submit Shop Application"}
            </button>
          </div>
        </form>
      </div>

      <div className="max-w-2xl w-full space-y-4 mt-4 animate-fade-in">
        {/* Register as Customer */}
        <div className="bg-indigo-50 border border-indigo-100/80 p-4 rounded-xl flex items-center justify-center gap-2 shadow-sm">
          <span className="text-sm text-indigo-900">
            Just looking to buy products?
          </span>
          <Link
            href="/register"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center gap-1"
          >
            Register as a Customer &rarr;
          </Link>
        </div>

        {/* Redirect to Login */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Already have a shop?{" "}
            <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
