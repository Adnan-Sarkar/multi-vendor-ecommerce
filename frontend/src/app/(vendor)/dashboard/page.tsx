import { CurrencyDollar, Package, ClipboardText, TrendUp } from "@phosphor-icons/react/dist/ssr";
import { StatCard } from "./components/StatCard";

export default function VendorDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value="$12,426.00" 
          icon={<CurrencyDollar size={24} className="text-green-600" />} 
          trend="+14% this month" 
        />
        <StatCard 
          title="Active Orders" 
          value="24" 
          icon={<ClipboardText size={24} className="text-blue-600" />} 
          trend="4 pending fulfillment" 
        />
        <StatCard 
          title="Total Products" 
          value="156" 
          icon={<Package size={24} className="text-purple-600" />} 
          trend="+3 this week" 
        />
        <StatCard 
          title="Store Views" 
          value="4,821" 
          icon={<TrendUp size={24} className="text-orange-600" />} 
          trend="+22% this week" 
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">#ORD-{9000 + i}</td>
                  <td className="px-6 py-4">John Doe</td>
                  <td className="px-6 py-4">May 12, 2026</td>
                  <td className="px-6 py-4">${(Math.random() * 200).toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
