import { getProfileAction } from "@/actions/profileActions";
import { VendorSidebar } from "./dashboard/components/VendorSidebar";
import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";

export default async function VendorLayout({ children }: { children: React.ReactNode }) {
  const profile = await getProfileAction();

  const userName = profile?.name ?? "Vendor";
  const shopName = profile?.vendor_profile?.shop_name ?? "My Shop";

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      <VendorSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardTopbar userName={userName} subtitle={shopName} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
