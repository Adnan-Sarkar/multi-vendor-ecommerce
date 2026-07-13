"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { registerAction } from "@/actions/authActions";
import Link from "next/link";
import { toast } from "sonner";
import {
  User,
  Envelope,
  Phone,
  Lock,
  LockKey,
  UserPlus,
  Storefront,
  ArrowRight,
} from "@phosphor-icons/react";
import { AuthShell, AuthBrandPanel } from "@/components/shared/auth";
import { Input, Button, FormError, FormHeader } from "@/components/ui";

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
    <AuthShell>
      <div className="animate-fade-in-up grid w-full max-w-4xl overflow-hidden rounded-3xl border border-white/60 bg-white/70 shadow-2xl shadow-indigo-500/10 backdrop-blur-xl lg:grid-cols-2">
        <AuthBrandPanel
          eyebrow="Join us"
          heading="Start shopping smarter today."
          subheading="Create your free account to save favourites, check out faster and track every order in one place."
          features={[
            {
              icon: "sparkle",
              title: "Free to join",
              description: "No fees — set up your account in seconds.",
            },
            {
              icon: "truck",
              title: "Order tracking",
              description: "Follow your parcels from cart to doorstep.",
            },
            {
              icon: "shield",
              title: "Buyer protection",
              description: "Shop confidently with secure checkout.",
            },
          ]}
        />

        <div className="p-8 sm:p-10">
          <FormHeader
            icon={UserPlus}
            title="Create your account"
            subtitle="It only takes a minute."
            showBrand
          />

          <form className="space-y-5" action={formAction}>
            <FormError message={state?.error} />

            <Input
              label="Full Name"
              icon={User}
              name="name"
              type="text"
              required
              defaultValue={(state?.inputs?.name as string) || ""}
              placeholder="John Doe"
              error={state?.errors?.name?.[0]}
            />

            <Input
              label="Email Address"
              icon={Envelope}
              name="email"
              type="email"
              required
              defaultValue={(state?.inputs?.email as string) || ""}
              placeholder="you@example.com"
              error={state?.errors?.email?.[0]}
            />

            <Input
              label="Phone Number"
              icon={Phone}
              name="phone"
              type="text"
              required
              defaultValue={(state?.inputs?.phone as string) || ""}
              placeholder="01712345678"
              error={state?.errors?.phone?.[0]}
            />

            <Input
              label="Password"
              icon={Lock}
              name="password"
              type="password"
              required
              defaultValue={(state?.inputs?.password as string) || ""}
              placeholder="••••••••"
              error={state?.errors?.password?.[0]}
            />

            <Input
              label="Confirm Password"
              icon={LockKey}
              name="password_confirmation"
              type="password"
              required
              defaultValue={
                (state?.inputs?.password_confirmation as string) || ""
              }
              placeholder="••••••••"
              error={state?.errors?.password_confirmation?.[0]}
            />

            <Button
              type="submit"
              className="cursor-pointer"
              fullWidth
              size="lg"
              pending={isPending}
              pendingLabel="Creating account..."
            >
              Create account
            </Button>
          </form>

          <div className="mt-8 space-y-4">
            <Link
              href="/register-vendor"
              className="group flex items-center justify-between gap-3 rounded-xl border border-indigo-100 bg-indigo-50/70 px-4 py-3 transition-colors hover:border-indigo-200 hover:bg-indigo-50"
            >
              <span className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600/10 text-indigo-600">
                  <Storefront size={18} weight="bold" />
                </span>
                <span className="text-sm font-medium text-indigo-900">
                  Want to sell on our platform?
                </span>
              </span>
              <ArrowRight
                size={18}
                weight="bold"
                className="text-indigo-600 transition-transform group-hover:translate-x-1"
              />
            </Link>

            <p className="text-center text-sm text-slate-500">
              Already have an account?{" "}
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
