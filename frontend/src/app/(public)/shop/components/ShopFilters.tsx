export function ShopFilters() {
  return (
    <div className="w-full lg:w-64 flex-shrink-0">
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
          <ul className="space-y-3">
            <li>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /> 
                <span className="text-gray-600">Electronics</span>
              </label>
            </li>
            <li>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /> 
                <span className="text-gray-600">Computers</span>
              </label>
            </li>
            <li>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" /> 
                <span className="text-gray-600">Audio</span>
              </label>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Price Range</h3>
          <div className="flex items-center gap-4">
            <input type="number" placeholder="Min" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <span className="text-gray-400">-</span>
            <input type="number" placeholder="Max" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

