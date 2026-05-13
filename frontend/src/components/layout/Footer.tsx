import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-gray-50 pt-16 pb-8 mt-auto">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-lg font-bold mb-4 text-indigo-600">MultiVendor</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              The premier marketplace for top-quality products from trusted vendors worldwide.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-900">Shop</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="/shop" className="hover:text-indigo-600 transition-colors">All Products</Link></li>
              <li><Link href="/categories" className="hover:text-indigo-600 transition-colors">Categories</Link></li>
              <li><Link href="/deals" className="hover:text-indigo-600 transition-colors">Flash Deals</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-900">Vendors</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="/vendors/register" className="hover:text-indigo-600 transition-colors">Become a Vendor</Link></li>
              <li><Link href="/vendors" className="hover:text-indigo-600 transition-colors">Vendor Directory</Link></li>
              <li><Link href="/vendor/login" className="hover:text-indigo-600 transition-colors">Vendor Login</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-900">Support</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="/contact" className="hover:text-indigo-600 transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-indigo-600 transition-colors">FAQ</Link></li>
              <li><Link href="/terms" className="hover:text-indigo-600 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t pt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} MultiVendor E-Commerce. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

