import Link from "next/link";
import { Users, Storefront, ChartPieSlice, Gear, SignOut } from "@phosphor-icons/react/dist/ssr";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <span className="text-xl font-bold text-white">SuperAdmin</span>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white">
            <ChartPieSlice size={20} />
            Overview
          </Link>
          <Link href="/admin/vendors" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <Storefront size={20} />
            Vendor Management
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <Users size={20} />
            Users
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <Gear size={20} />
            Global Settings
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
            <SignOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
          <h1 className="text-xl font-semibold text-gray-800">System Administrator</h1>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-sm">
              SA
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

