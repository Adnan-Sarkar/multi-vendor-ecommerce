"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { forgotPasswordAction } from "@/actions/authActions";
import { toast } from "sonner";
import Link from "next/link";
import { Envelope, LockKeyOpen, ArrowLeft } from "@phosphor-icons/react";
import { AuthShell } from "@/components/shared/auth";
import { Input, Button, FormHeader } from "@/components/ui";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    forgotPasswordAction,
    null,
  );

  useEffect(() => {
    if (isPending) {
      toast.loading("Sending OTP...", { id: "auth-toast" });
    } else if (state?.success) {
      toast.success("OTP sent to your email!", { id: "auth-toast" });

      router.push(
        `/reset-password?email=${encodeURIComponent(state.email as string)}`,
      );
    } else if (state?.error) {
      toast.error(state.error, { id: "auth-toast" });
    } else {
      toast.dismiss("auth-toast");
    }
  }, [isPending, state, router]);

  return (
    <AuthShell>
      <div className="animate-fade-in-up w-full max-w-md rounded-3xl border border-white/60 bg-white/70 p-8 shadow-2xl shadow-indigo-500/10 backdrop-blur-xl sm:p-10">
        <FormHeader
          icon={LockKeyOpen}
          title="Forgot Password"
          subtitle="Enter your email and we will send you a 6-digit OTP code."
          showBrand
        />

        <form className="space-y-5" action={formAction}>
          <Input
            label="Email Address"
            icon={Envelope}
            name="email"
            type="email"
            required
            defaultValue={state?.inputs?.email || ""}
            placeholder="you@example.com"
            error={state?.errors?.email?.[0]}
          />

          <Button
            type="submit"
            className="cursor-pointer"
            fullWidth
            size="lg"
            pending={isPending}
            pendingLabel="Sending..."
          >
            Send OTP
          </Button>
        </form>

        <Link
          href="/login"
          className="mt-6 flex items-center justify-center gap-1.5 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-800"
        >
          <ArrowLeft size={16} weight="bold" />
          Back to Sign In
        </Link>
      </div>
    </AuthShell>
  );
}
