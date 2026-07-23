"use client";

import { useActionState, useEffect, useState } from "react";
import { updateCustomerProfileAction } from "@/actions/profileActions";
import { User, Phone, Cake } from "@phosphor-icons/react";
import { toast } from "sonner";
import { Input, Button, ImageUpload } from "@/components/ui";

type CustomerProfile = {
  date_of_birth: string | null;
  gender: string | null;
};

type Profile = {
  name: string;
  phone: string | null;
  avatar: string | null;
  customer_profile: CustomerProfile | null;
};

type Props = {
  profile: Profile;
};

export function ProfileForm({ profile }: Props) {
  const [state, formAction, isPending] = useActionState(
    updateCustomerProfileAction,
    null,
  );
  const [isImageUploading, setIsImageUploading] = useState(false);

  useEffect(() => {
    if (isPending) {
      toast.loading("Saving changes...", { id: "profile-toast" });
    } else if (state?.success) {
      toast.success(state.message || "Profile updated!", { id: "profile-toast" });
    } else if (state?.error) {
      toast.error(state.error, { id: "profile-toast" });
    } else {
      toast.dismiss("profile-toast");
    }
  }, [isPending, state]);

  return (
    <div className="glass overflow-hidden rounded-3xl shadow-xl shadow-indigo-500/10">
      <div className="flex items-center gap-3 border-b border-white/60 px-7 py-5">
        <span className="bg-brand-gradient h-9 w-1.5 rounded-full" />
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Personal Information
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Update your name, phone, and personal details.
          </p>
        </div>
      </div>

      <form action={formAction} className="space-y-5 px-7 py-6">
        <ImageUpload
          label="Profile Photo"
          name="avatar"
          folder="avatars"
          shape="circle"
          defaultUrl={profile.avatar}
          helperText="Upload a clear photo of yourself."
          error={state?.errors?.avatar?.[0]}
          onUploadingChange={setIsImageUploading}
        />

        <Input
          label="Full Name"
          icon={User}
          id="name"
          name="name"
          type="text"
          defaultValue={profile.name}
          placeholder="Your full name"
          error={state?.errors?.name?.[0]}
        />

        <Input
          label="Phone Number"
          icon={Phone}
          id="phone"
          name="phone"
          type="tel"
          defaultValue={profile.phone ?? ""}
          placeholder="01XXXXXXXXX"
          error={state?.errors?.phone?.[0]}
        />

        <Input
          label="Date of Birth"
          icon={Cake}
          id="date_of_birth"
          name="date_of_birth"
          type="date"
          defaultValue={profile.customer_profile?.date_of_birth?.slice(0, 10) ?? ""}
          error={state?.errors?.date_of_birth?.[0]}
        />

        <div>
          <label
            htmlFor="gender"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            defaultValue={profile.customer_profile?.gender ?? ""}
            className="w-full rounded-xl border border-slate-200 bg-white/70 px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/15"
          >
            <option value="">Prefer not to say</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {state?.errors?.gender && (
            <p className="mt-1.5 text-xs font-medium text-red-500">
              {state.errors.gender[0]}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="cursor-pointer"
          fullWidth
          size="lg"
          disabled={isImageUploading}
          pending={isPending || isImageUploading}
          pendingLabel={isImageUploading ? "Uploading image..." : "Saving..."}
        >
          Save Changes
        </Button>
      </form>
    </div>
  );
}
