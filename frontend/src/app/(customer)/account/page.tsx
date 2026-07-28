import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getProfileAction } from "@/actions/profileActions";
import { getAddresses } from "@/services/addressService";
import { AuthBackground } from "@/components/shared/auth";
import { ProfileHeader } from "./_components/ProfileHeader";
import { ProfileForm } from "./_components/ProfileForm";
import { ChangePasswordForm } from "./_components/ChangePasswordForm";
import { AddressBook } from "./_components/AddressBook";

export const metadata: Metadata = {
  title: "My Account | MultiVendor",
  description: "Manage your profile, personal details and account security.",
};

export default async function AccountPage() {
  const profile = await getProfileAction();

  if (!profile) {
    redirect("/login");
  }

  const addresses = await getAddresses();

  return (
    <div className="relative flex-1 px-4 py-12 sm:px-6">
      <AuthBackground />

      <div className="animate-fade-in-up mx-auto w-full max-w-5xl space-y-6">
        <ProfileHeader profile={profile} />

        <div className="grid items-start gap-6 lg:grid-cols-2">
          <ProfileForm profile={profile} />
          <ChangePasswordForm />
        </div>

        <AddressBook addresses={addresses} />
      </div>
    </div>
  );
}
