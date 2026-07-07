<?php

namespace App\Services;

use App\Models\Order;
use App\Models\OrderVendor;
use App\Models\Product;
use App\Models\User;
use App\Models\VendorProfile;

class DashboardService
{
    public function getVendorDashboard(): array {
        $vendorId = auth()->user()->vendorProfile->id;

        return [
            'total_products' => Product::where('vendor_id', $vendorId)->count(),
            'total_orders' => OrderVendor::where('vendor_id', $vendorId)->count(),
            'pending_orders' => OrderVendor::where('vendor_id', $vendorId)
                ->where('status', 'pending')->count(),
            'total_revenue' => OrderVendor::where('vendor_id', $vendorId)
                ->sum('vendor_earning'),
            'balance' => auth()->user()->vendorProfile->balance,
        ];
    }

    public function getAdminDashboard(): array {
        return [
            'total_users' => User::where('role', 'customer')->count(),
            'total_vendors' => User::where('role', 'vendor')->count(),
            'total_products' => Product::count(),
            'total_orders' => Order::count(),
            'total_revenue' => Order::where('payment_status', 'paid')->sum('grand_total'),
            'pending_vendor_approvals' => VendorProfile::where('status', 'pending')->count(),
            'pending_product_approvals' => Product::where('status', 'pending')->count(),
        ];
    }
}
