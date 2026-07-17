"use client";

import { useActionState, useEffect } from "react";
import { updateVendorProfileAction } from "@/actions/profileActions";
import {
  User,
  Phone,
  Storefront,
  MapPin,
  Buildings,
  CircleNotch,
} from "@phosphor-icons/react";
import { toast } from "sonner";
import { Input, Textarea, FormError } from "@/components/ui";
import { SettingsSection } from "./SettingsSection";

type VendorProfile = {
  shop_name: string;
  slug: string;
  description: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
};

type Profile = {
  name: string;
  email: string;
  phone: string | null;
  vendor_profile: VendorProfile | null;
};

export function ShopSettingsForm({ profile }: { profile: Profile }) {
  const [state, formAction, isPending] = useActionState(
    updateVendorProfileAction,
    null,
  );

  const shop = profile.vendor_profile;

  useEffect(() => {
    if (isPending) {
      toast.loading("Saving changes...", { id: "shop-toast" });
    } else if (state?.success) {
      toast.success(state.message || "Shop details updated!", {
        id: "shop-toast",
      });
    } else if (state?.error) {
      toast.error(state.error, { id: "shop-toast" });
    } else {
      toast.dismiss("shop-toast");
    }
  }, [isPending, state]);

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && !state?.errors && <FormError message={state.error} />}

      <SettingsSection
        title="Account Information"
        description="Your personal contact details used for this account."
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
        </div>
        <div className="mt-5">
          <Input
            label="Email Address"
            id="email"
            type="email"
            defaultValue={profile.email}
            disabled
          />
          <p className="mt-1.5 text-xs text-gray-400">
            Email cannot be changed from here.
          </p>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Shop Details"
        description="Information customers see on your store page."
      >
        <div className="space-y-5">
          <Input
            label="Shop Name"
            icon={Storefront}
            id="shop_name"
            name="shop_name"
            type="text"
            defaultValue={shop?.shop_name ?? ""}
            placeholder="Your shop name"
            error={state?.errors?.shop_name?.[0]}
          />
          <Textarea
            label="Description"
            icon={Buildings}
            id="description"
            name="description"
            rows={4}
            defaultValue={shop?.description ?? ""}
            placeholder="Tell customers about your shop..."
            error={state?.errors?.description?.[0]}
          />
        </div>
      </SettingsSection>

      <SettingsSection
        title="Store Address"
        description="Where your shop operates from."
      >
        <div className="space-y-5">
          <Input
            label="Address"
            icon={MapPin}
            id="address"
            name="address"
            type="text"
            defaultValue={shop?.address ?? ""}
            placeholder="Street address"
            error={state?.errors?.address?.[0]}
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <Input
              label="City"
              id="city"
              name="city"
              type="text"
              defaultValue={shop?.city ?? ""}
              placeholder="City"
              error={state?.errors?.city?.[0]}
            />
            <Input
              label="State"
              id="state"
              name="state"
              type="text"
              defaultValue={shop?.state ?? ""}
              placeholder="State"
              error={state?.errors?.state?.[0]}
            />
            <Input
              label="Zip Code"
              id="zip_code"
              name="zip_code"
              type="text"
              defaultValue={shop?.zip_code ?? ""}
              placeholder="Zip code"
              error={state?.errors?.zip_code?.[0]}
            />
          </div>
        </div>
      </SettingsSection>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPending && <CircleNotch size={18} weight="bold" className="animate-spin" />}
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
