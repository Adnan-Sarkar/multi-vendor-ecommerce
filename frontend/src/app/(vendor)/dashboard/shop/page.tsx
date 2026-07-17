import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getProfileAction } from "@/actions/profileActions";
import { ShopSettingsForm } from "./components/ShopSettingsForm";
import { ShopStatusBadge } from "./components/ShopStatusBadge";

export const metadata: Metadata = {
  title: "Shop Settings | VendorPanel",
  description: "Update your shop details and account profile.",
};

export default async function ShopSettingsPage() {
  const profile = await getProfileAction();

  if (!profile) {
    redirect("/login");
  }

  const shop = profile.vendor_profile;

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Shop Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your store information and account profile.
          </p>
        </div>
        {shop?.status && <ShopStatusBadge status={shop.status} />}
      </div>

      <ShopSettingsForm profile={profile} />
    </div>
  );
}
