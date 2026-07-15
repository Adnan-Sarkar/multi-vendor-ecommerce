"use client";

import { useActionState, useEffect } from "react";
import { changePasswordAction } from "@/actions/profileActions";
import { Lock, LockKey, ShieldCheck } from "@phosphor-icons/react";
import { toast } from "sonner";
import { Input, Button, FormError } from "@/components/ui";

export function ChangePasswordForm() {
  const [state, formAction, isPending] = useActionState(
    changePasswordAction,
    null,
  );

  useEffect(() => {
    if (isPending) {
      toast.loading("Updating password...", { id: "password-toast" });
    } else if (state?.success) {
      toast.success(state.message || "Password changed successfully!", {
        id: "password-toast",
      });
    } else if (state?.error) {
      toast.error(state.error, { id: "password-toast" });
    } else {
      toast.dismiss("password-toast");
    }
  }, [isPending, state]);

  return (
    <div className="glass overflow-hidden rounded-3xl shadow-xl shadow-indigo-500/10">
      <div className="flex items-center gap-3 border-b border-white/60 px-7 py-5">
        <span className="bg-brand-gradient h-9 w-1.5 rounded-full" />
        <div>
          <h2 className="text-base font-bold text-slate-900">Change Password</h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Use a strong password with at least 8 characters.
          </p>
        </div>
      </div>

      <form action={formAction} className="space-y-5 px-7 py-6">
        {state?.error && !state?.errors && <FormError message={state.error} />}

        <Input
          label="Current Password"
          icon={Lock}
          id="current_password"
          name="current_password"
          type="password"
          placeholder="Enter your current password"
          error={state?.errors?.current_password?.[0]}
        />

        <Input
          label="New Password"
          icon={LockKey}
          id="new_password"
          name="new_password"
          type="password"
          placeholder="At least 8 characters"
          error={state?.errors?.new_password?.[0]}
        />

        <Input
          label="Confirm New Password"
          icon={ShieldCheck}
          id="new_password_confirmation"
          name="new_password_confirmation"
          type="password"
          placeholder="Repeat your new password"
          error={state?.errors?.new_password_confirmation?.[0]}
        />

        <Button
          type="submit"
          className="cursor-pointer"
          fullWidth
          size="lg"
          pending={isPending}
          pendingLabel="Updating..."
        >
          Update Password
        </Button>
      </form>
    </div>
  );
}
