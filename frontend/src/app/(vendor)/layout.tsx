import Link from "next/link";
import { Storefront, Package, ClipboardText, ChartLineUp, SignOut } from "@phosphor-icons/react/dist/ssr";

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <span className="text-xl font-bold text-indigo-600">VendorPanel</span>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg bg-indigo-50 text-indigo-700">
            <ChartLineUp size={20} />
            Dashboard
          </Link>
          <Link href="/dashboard/products" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
            <Package size={20} />
            Products
          </Link>
          <Link href="/dashboard/orders" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
            <ClipboardText size={20} />
            Orders
          </Link>
          <Link href="/dashboard/shop" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
            <Storefront size={20} />
            Shop Settings
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 transition-colors">
            <SignOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold text-gray-800">Dashboard Overview</h1>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
              JD
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

