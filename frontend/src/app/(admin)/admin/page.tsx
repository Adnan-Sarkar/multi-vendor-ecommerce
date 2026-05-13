import { getPendingVendorApplications } from "@/services/adminService";
import { VendorApprovalTable } from "./components/VendorApprovalTable";
import { Users, Storefront, CurrencyDollar } from "@phosphor-icons/react/dist/ssr";

export default async function AdminDashboardPage() {
  const applications = await getPendingVendorApplications();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="h-12 w-12 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <CurrencyDollar size={24} weight="bold" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Platform Revenue (10% Cut)</p>
            <h3 className="text-2xl font-bold text-gray-900">$45,231.00</h3>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="h-12 w-12 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
            <Storefront size={24} weight="bold" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Active Vendors</p>
            <h3 className="text-2xl font-bold text-gray-900">124</h3>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="h-12 w-12 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
            <Users size={24} weight="bold" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Registered Users</p>
            <h3 className="text-2xl font-bold text-gray-900">8,492</h3>
          </div>
        </div>
      </div>

      <VendorApprovalTable applications={applications} />
    </div>
  );
}

