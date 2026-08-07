"use client";

import { useActionState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPasswordAction } from "@/actions/authActions";
import { toast } from "sonner";
import Link from "next/link";
import {
  Password,
  Lock,
  LockKey,
  Envelope,
  ArrowLeft,
  ShieldCheck,
  CircleNotch,
} from "@phosphor-icons/react";
import { AuthShell } from "@/components/shared/auth";
import { Input, Button, FormHeader } from "@/components/ui";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const emailParam = searchParams.get("email") || "";

  const [state, formAction, isPending] = useActionState(
    resetPasswordAction,
    null,
  );

  useEffect(() => {
    if (isPending) {
      toast.loading("Resetting password...", { id: "auth-toast" });
    } else if (state?.success) {
      toast.success("Password reset successful! Please log in.", {
        id: "auth-toast",
      });
      router.push("/login");
    } else if (state?.error) {
      toast.error(state.error, { id: "auth-toast" });
    } else {
      toast.dismiss("auth-toast");
    }
  }, [isPending, state, router]);

  return (
    <form className="space-y-5" action={formAction}>
      {/* Hidden input to pass the email to the Server Action */}
      <input type="hidden" name="email" value={emailParam} />

      {/* Read-only email display */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-500">
          Resetting password for
        </label>
        <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-100/80 px-3.5 py-2.5 text-sm text-slate-500">
          <Envelope
            size={18}
            weight="regular"
            className="flex-none text-slate-400"
          />
          <span className="truncate">{emailParam || "—"}</span>
        </div>
      </div>

      <Input
        label="6-Digit OTP Code"
        icon={Password}
        name="otp"
        type="text"
        inputMode="numeric"
        maxLength={6}
        required
        defaultValue={state?.inputs?.otp || ""}
        placeholder="000000"
        error={state?.errors?.otp?.[0]}
      />

      <Input
        label="New Password"
        icon={Lock}
        name="password"
        type="password"
        required
        placeholder="••••••••"
        error={state?.errors?.password?.[0]}
      />

      <Input
        label="Confirm New Password"
        icon={LockKey}
        name="password_confirmation"
        type="password"
        required
        placeholder="••••••••"
        error={state?.errors?.password_confirmation?.[0]}
      />

      <Button
        type="submit"
        className="cursor-pointer"
        fullWidth
        size="lg"
        pending={isPending}
        pendingLabel="Resetting..."
      >
        Reset Password
      </Button>

      <Link
        href="/login"
        className="flex items-center justify-center gap-1.5 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-800"
      >
        <ArrowLeft size={16} weight="bold" />
        Back to Sign In
      </Link>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <AuthShell>
      <div className="animate-fade-in-up w-full max-w-md rounded-3xl border border-white/60 bg-white/70 p-8 shadow-2xl shadow-indigo-500/10 backdrop-blur-xl sm:p-10">
        <FormHeader
          icon={ShieldCheck}
          title="Reset Password"
          subtitle="Please enter the 6-digit OTP code and choose a new password."
          showBrand
        />

        <Suspense
          fallback={
            <p className="flex items-center justify-center gap-2 py-6 text-sm text-slate-500">
              <CircleNotch size={18} weight="bold" className="animate-spin" />
              Loading form...
            </p>
          }
        >
          <ResetPasswordForm />
        </Suspense>
      </div>
    </AuthShell>
  );
}
