"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { registerVendorAction } from "@/actions/registerVendorAction";
import { toast } from "sonner";
import Link from "next/link";
import {
  User,
  Envelope,
  Phone,
  Lock,
  LockKey,
  Storefront,
  TextAlignLeft,
  MapPin,
  City,
  MapTrifold,
  ArrowRight,
  ShoppingBag,
} from "@phosphor-icons/react";
import { AuthShell } from "@/components/shared/auth";
import { Input, Textarea, Button } from "@/components/ui";

export default function RegisterVendorPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    registerVendorAction,
    null,
  );

  useEffect(() => {
    if (isPending) {
      toast.loading("Submitting vendor application...", { id: "auth-toast" });
    } else if (state?.success) {
      toast.success("Registration successful! Accessing dashboard...", {
        id: "auth-toast",
      });
      router.push("/dashboard");
      router.refresh();
    } else if (state?.error) {
      toast.error(state.error, { id: "auth-toast" });
    } else {
      toast.dismiss("auth-toast");
    }
  }, [isPending, state, router]);

  return (
    <AuthShell>
      <div className="animate-fade-in-up w-full max-w-3xl overflow-hidden rounded-3xl border border-white/60 bg-white/70 shadow-2xl shadow-indigo-500/10 backdrop-blur-xl">
        {/* Gradient header band */}
        <div className="relative overflow-hidden bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-600 px-8 py-8 sm:px-10">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -top-16 -right-10 h-52 w-52 rounded-full bg-white/15 blur-3xl" />
            <div
              className="absolute inset-0 opacity-[0.1]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                backgroundSize: "22px 22px",
              }}
            />
          </div>
          <div className="relative z-10 flex items-center gap-4">
            <span className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-white/20 text-white ring-1 ring-white/30 backdrop-blur-sm">
              <Storefront size={28} weight="fill" />
            </span>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Register as a Vendor
              </h1>
              <p className="mt-1 text-sm text-indigo-100">
                Set up your shop and start selling on our platform.
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-10">
          <form className="space-y-8" action={formAction}>
            {/* Personal Details */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <User size={18} weight="bold" className="text-indigo-600" />
                <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
                  Personal Details
                </h3>
                <span className="ml-2 h-px flex-1 bg-slate-200" />
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <Input
                  label="Full Name"
                  icon={User}
                  name="name"
                  type="text"
                  required
                  defaultValue={state?.inputs?.name || ""}
                  placeholder="John Doe"
                  error={state?.errors?.name?.[0]}
                />
                <Input
                  label="Email Address"
                  icon={Envelope}
                  name="email"
                  type="email"
                  required
                  defaultValue={state?.inputs?.email || ""}
                  placeholder="vendor@example.com"
                  error={state?.errors?.email?.[0]}
                />
                <Input
                  label="Phone Number"
                  icon={Phone}
                  name="phone"
                  type="text"
                  required
                  defaultValue={state?.inputs?.phone || ""}
                  placeholder="01712345678"
                  error={state?.errors?.phone?.[0]}
                />
                <Input
                  label="Password"
                  icon={Lock}
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  error={state?.errors?.password?.[0]}
                />
                <div className="md:col-span-2">
                  <Input
                    label="Confirm Password"
                    icon={LockKey}
                    name="password_confirmation"
                    type="password"
                    required
                    placeholder="••••••••"
                    error={state?.errors?.password_confirmation?.[0]}
                  />
                </div>
              </div>
            </div>

            {/* Shop Details */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Storefront
                  size={18}
                  weight="bold"
                  className="text-indigo-600"
                />
                <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
                  Shop Details
                </h3>
                <span className="ml-2 h-px flex-1 bg-slate-200" />
              </div>

              <div className="space-y-5">
                <Input
                  label="Shop Name"
                  icon={ShoppingBag}
                  name="shop_name"
                  type="text"
                  required
                  defaultValue={state?.inputs?.shop_name || ""}
                  placeholder="Super Fast Tech"
                  error={state?.errors?.shop_name?.[0]}
                />
                <Textarea
                  label="Shop Description"
                  icon={TextAlignLeft}
                  name="description"
                  required
                  defaultValue={state?.inputs?.description || ""}
                  rows={3}
                  placeholder="Briefly describe what your shop sells..."
                  error={state?.errors?.description?.[0]}
                />
                <Input
                  label="Shop Address"
                  icon={MapPin}
                  name="address"
                  type="text"
                  required
                  defaultValue={state?.inputs?.address || ""}
                  placeholder="123 Shop Street"
                  error={state?.errors?.address?.[0]}
                />
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <Input
                    label="City"
                    icon={City}
                    name="city"
                    type="text"
                    required
                    defaultValue={state?.inputs?.city || ""}
                    placeholder="Dhaka"
                    error={state?.errors?.city?.[0]}
                  />
                  <Input
                    label="State / Division"
                    icon={MapTrifold}
                    name="state"
                    type="text"
                    required
                    defaultValue={state?.inputs?.state || ""}
                    placeholder="Dhaka Division"
                    error={state?.errors?.state?.[0]}
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="cursor-pointer"
              fullWidth
              size="lg"
              pending={isPending}
              pendingLabel="Creating vendor account..."
            >
              Submit Shop Application
            </Button>
          </form>

          <div className="mt-8 space-y-4">
            <Link
              href="/register"
              className="group flex items-center justify-between gap-3 rounded-xl border border-indigo-100 bg-indigo-50/70 px-4 py-3 transition-colors hover:border-indigo-200 hover:bg-indigo-50"
            >
              <span className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600/10 text-indigo-600">
                  <ShoppingBag size={18} weight="bold" />
                </span>
                <span className="text-sm font-medium text-indigo-900">
                  Just looking to buy products?
                </span>
              </span>
              <ArrowRight
                size={18}
                weight="bold"
                className="text-indigo-600 transition-transform group-hover:translate-x-1"
              />
            </Link>

            <p className="text-center text-sm text-slate-500">
              Already have a shop?{" "}
              <Link
                href="/login"
                className="font-semibold text-indigo-600 transition-colors hover:text-indigo-500"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthShell>
  );
}
