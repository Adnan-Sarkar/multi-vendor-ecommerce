import { getProfileAction } from "@/actions/profileActions";
import { AdminSidebar } from "./admin/components/AdminSidebar";
import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const profile = await getProfileAction();

  const userName = profile?.name ?? "Admin";

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      <AdminSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardTopbar userName={userName} subtitle="Administrator" />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
