"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "@/actions/authActions";
import Link from "next/link";
import { toast } from "sonner";
import {
  Envelope,
  Lock,
  SignIn,
  Storefront,
  ArrowRight,
} from "@phosphor-icons/react";
import { AuthShell, AuthBrandPanel } from "@/components/shared/auth";
import { Input, Button, FormError, FormHeader } from "@/components/ui";

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
    <AuthShell>
      <div className="animate-fade-in-up grid w-full max-w-4xl overflow-hidden rounded-3xl border border-white/60 bg-white/70 shadow-2xl shadow-indigo-500/10 backdrop-blur-xl lg:grid-cols-2">
        <AuthBrandPanel
          eyebrow="Welcome back"
          heading="Your marketplace, all in one place."
          subheading="Sign in to track orders, manage your wishlist and pick up right where you left off."
          features={[
            {
              icon: "shield",
              title: "Secure by design",
              description: "Your account and payments stay protected.",
            },
            {
              icon: "truck",
              title: "Fast delivery",
              description: "Track every order from checkout to doorstep.",
            },
            {
              icon: "sparkle",
              title: "Curated picks",
              description: "Discover top products from trusted vendors.",
            },
          ]}
        />

        <div className="p-8 sm:p-10">
          <FormHeader
            icon={SignIn}
            title="Sign in to your account"
            subtitle="Enter your credentials to continue."
            showBrand
          />

          <form className="space-y-5" action={formAction}>
            <FormError message={state?.error} />

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
              label="Password"
              icon={Lock}
              name="password"
              type="password"
              required
              defaultValue={(state?.inputs?.password as string) || ""}
              placeholder="••••••••"
              error={state?.errors?.password?.[0]}
              labelAction={
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-indigo-600 transition-colors hover:text-indigo-800"
                >
                  Forgot password?
                </Link>
              }
            />

            <Button
              type="submit"
              className="cursor-pointer"
              fullWidth
              size="lg"
              pending={isPending}
              pendingLabel="Signing in..."
            >
              Sign in
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
              New to our platform?{" "}
              <Link
                href="/register"
                className="font-semibold text-indigo-600 transition-colors hover:text-indigo-500"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthShell>
  );
}
