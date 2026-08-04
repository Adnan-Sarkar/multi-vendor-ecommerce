<?php

namespace App\Services;

use App\Models\Category;
use App\Models\Coupon;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderVendor;
use App\Models\Product;
use App\Models\Review;
use App\Models\User;
use App\Models\VendorProfile;
use App\Models\Withdrawal;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

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

    public function getAdminDashboard(?string $range = null): array {
        $range = in_array($range, ['today', '7d', '30d', '90d', 'all'], true)
            ? $range
            : '30d';

        $paidOrdersCount = Order::where('payment_status', 'paid')->count();
        $grossMerchandiseValue = (float) Order::where('payment_status', 'paid')->sum('grand_total');

        return [
            'range' => $range,
            'period' => $this->getPeriodMetrics($range),

            'total_users' => User::where('role', 'customer')->count(),
            'total_vendors' => User::where('role', 'vendor')->count(),
            'total_products' => Product::count(),
            'total_orders' => Order::count(),
            'total_revenue' => $grossMerchandiseValue,
            'total_reviews' => Review::count(),
            'total_coupons' => Coupon::count(),
            'total_categories' => Category::count(),

            // Financial depth
            'platform_commission' => $this->getPlatformCommission(),
            'average_order_value' => $paidOrdersCount > 0
                ? round($grossMerchandiseValue / $paidOrdersCount, 2)
                : 0,
            'total_discounts' => (float) Order::where('payment_status', 'paid')->sum('coupon_discount'),
            'total_shipping' => (float) Order::where('payment_status', 'paid')->sum('shipping_cost'),
            'total_paid_out' => (float) Withdrawal::where('status', 'approved')->sum('amount'),
            'pending_payout_amount' => (float) Withdrawal::where('status', 'pending')->sum('amount'),
            'vendor_payables' => (float) VendorProfile::sum('balance'),

            // Order health
            'payment_method_split' => $this->getPaymentMethodSplit(),
            'average_items_per_order' => $this->getAverageItemsPerOrder(),

            // Product / inventory
            'top_products' => $this->getTopProducts(),
            'most_viewed_products' => $this->getMostViewedProducts(),
            'low_stock_count' => $this->getLowStockCount(),
            'out_of_stock_count' => Product::where('in_stock', false)->count(),

            // Customers
            'top_customers' => $this->getTopCustomers(),
            'repeat_customers' => $this->getCustomerCountWithOrders('>', 1),
            'single_order_customers' => $this->getCustomerCountWithOrders('=', 1),

            // Reviews
            'average_rating' => round((float) Review::where('is_approved', true)->avg('rating'), 1),
            'rating_distribution' => $this->getRatingDistribution(),

            // Approval queues
            'pending_vendor_approvals' => VendorProfile::where('status', 'pending')->count(),
            'pending_product_approvals' => Product::where('status', 'pending')->count(),
            'pending_reviews' => Review::where('is_approved', false)->count(),
            'pending_withdrawals' => Withdrawal::where('status', 'pending')->count(),

            // Trends
            'orders_by_status' => $this->getOrdersByStatus(),
            'revenue_last_6_months' => $this->getRevenueLastSixMonths(),
            'customers_last_6_months' => $this->getCustomersLastSixMonths(),
            'top_vendors' => $this->getTopVendors(),

            // Recent activity feed
            'recent_orders' => $this->getRecentOrders(),
            'recent_reviews' => $this->getRecentReviews(),
            'recent_signups' => $this->getRecentSignups(),
        ];
    }

    private function getPeriodMetrics(string $range): array {
        [$start, $end, $previousStart, $previousEnd] = $this->resolveWindow($range);

        $current = $this->metricsForWindow($start, $end);
        $previous = $previousStart === null
            ? null
            : $this->metricsForWindow($previousStart, $previousEnd);

        $keys = ['revenue', 'orders', 'new_customers', 'commission', 'average_order_value'];

        $result = [];
        foreach ($keys as $key) {
            $result[$key] = [
                'value' => $current[$key],
                'delta' => $previous
                    ? $this->deltaPercent($previous[$key], $current[$key])
                    : null,
            ];
        }

        return $result;
    }

    /**
     * @return array{0: ?Carbon, 1: ?Carbon, 2: ?Carbon, 3: ?Carbon}
     */
    private function resolveWindow(string $range): array {
        if ($range === 'all') {
            return [null, null, null, null];
        }

        $now = Carbon::now();

        $start = $range === 'today'
            ? $now->copy()->startOfDay()
            : $now->copy()->subDays(match ($range) {
                '7d' => 7,
                '90d' => 90,
                default => 30,
            });

        $end = $now->copy();
        $lengthInSeconds = $start->diffInSeconds($end);

        $previousEnd = $start->copy();
        $previousStart = $start->copy()->subSeconds($lengthInSeconds);

        return [$start, $end, $previousStart, $previousEnd];
    }

    /**
     * @return array{revenue: float, orders: int, new_customers: int, commission: float, average_order_value: float}
     */
    private function metricsForWindow(?Carbon $start, ?Carbon $end): array {
        $orders = Order::query();
        $paidOrders = Order::where('payment_status', 'paid');
        $newCustomers = User::where('role', 'customer');

        if ($start !== null) {
            $orders->whereBetween('created_at', [$start, $end]);
            $paidOrders->whereBetween('created_at', [$start, $end]);
            $newCustomers->whereBetween('created_at', [$start, $end]);
        }

        $revenue = (float) (clone $paidOrders)->sum('grand_total');
        $paidOrdersCount = (clone $paidOrders)->count();

        $commission = (float) OrderVendor::whereHas('order', function ($query) use ($start, $end) {
            $query->where('payment_status', 'paid');

            if ($start !== null) {
                $query->whereBetween('created_at', [$start, $end]);
            }
        })->sum('commission');

        return [
            'revenue' => $revenue,
            'orders' => (clone $orders)->count(),
            'new_customers' => (clone $newCustomers)->count(),
            'commission' => $commission,
            'average_order_value' => $paidOrdersCount > 0
                ? round($revenue / $paidOrdersCount, 2)
                : 0,
        ];
    }

    private function deltaPercent(float $previous, float $current): ?float {
        if ($previous == 0.0) {
            return null;
        }

        return round((($current - $previous) / $previous) * 100, 1);
    }

    private function getPlatformCommission(): float {
        return (float) OrderVendor::whereHas(
            'order',
            fn ($query) => $query->where('payment_status', 'paid')
        )->sum('commission');
    }

    private function getPaymentMethodSplit(): array {
        return Order::select('payment_method', DB::raw('COUNT(*) as total'))
            ->groupBy('payment_method')
            ->orderByDesc('total')
            ->get()
            ->map(fn ($row) => [
                'method' => $row->payment_method ?? 'unknown',
                'count' => (int) $row->total,
            ])
            ->all();
    }

    private function getAverageItemsPerOrder(): float {
        $ordersCount = Order::count();

        if ($ordersCount === 0) {
            return 0;
        }

        return round((float) OrderItem::sum('quantity') / $ordersCount, 1);
    }

    private function getTopProducts(): array {
        return OrderItem::select(
            'product_id',
            'product_name',
            DB::raw('SUM(quantity) as units'),
            DB::raw('SUM(total) as revenue')
        )
            ->groupBy('product_id', 'product_name')
            ->orderByDesc('revenue')
            ->limit(5)
            ->get()
            ->map(fn ($row) => [
                'name' => $row->product_name,
                'units' => (int) $row->units,
                'revenue' => (float) $row->revenue,
            ])
            ->all();
    }

    private function getMostViewedProducts(): array {
        return Product::orderByDesc('views')
            ->limit(5)
            ->get(['name', 'views'])
            ->map(fn ($product) => [
                'name' => $product->name,
                'views' => (int) $product->views,
            ])
            ->all();
    }

    private function getLowStockCount(): int {
        return Product::where('manage_stock', true)
            ->where('in_stock', true)
            ->whereNotNull('stock_qty')
            ->whereNotNull('low_stock_threshold')
            ->whereColumn('stock_qty', '<=', 'low_stock_threshold')
            ->count();
    }

    private function getTopCustomers(): array {
        return Order::select(
            'user_id',
            DB::raw('SUM(grand_total) as spent'),
            DB::raw('COUNT(*) as orders')
        )
            ->where('payment_status', 'paid')
            ->groupBy('user_id')
            ->orderByDesc('spent')
            ->limit(5)
            ->with('user:id,name')
            ->get()
            ->map(fn ($row) => [
                'name' => $row->user->name ?? 'Unknown',
                'spent' => (float) $row->spent,
                'orders' => (int) $row->orders,
            ])
            ->all();
    }

    private function getCustomerCountWithOrders(string $operator, int $value): int {
        return Order::select('user_id')
            ->groupBy('user_id')
            ->havingRaw("COUNT(*) {$operator} {$value}")
            ->get()
            ->count();
    }

    private function getRatingDistribution(): array {
        $counts = Review::where('is_approved', true)
            ->select('rating', DB::raw('COUNT(*) as total'))
            ->groupBy('rating')
            ->pluck('total', 'rating');

        $distribution = [];
        for ($rating = 5; $rating >= 1; $rating--) {
            $distribution[] = [
                'rating' => $rating,
                'count' => (int) ($counts[$rating] ?? 0),
            ];
        }

        return $distribution;
    }

    private function getRecentOrders(): array {
        return Order::with('user:id,name')
            ->latest()
            ->limit(5)
            ->get()
            ->map(fn ($order) => [
                'order_number' => $order->order_number,
                'customer' => $order->user->name ?? 'Unknown',
                'grand_total' => (float) $order->grand_total,
                'status' => $order->status,
                'created_at' => $order->created_at,
            ])
            ->all();
    }

    private function getRecentReviews(): array {
        return Review::with(['user:id,name', 'product:id,name'])
            ->latest()
            ->limit(5)
            ->get()
            ->map(fn ($review) => [
                'rating' => (int) $review->rating,
                'user' => $review->user->name ?? 'Unknown',
                'product' => $review->product->name ?? 'Unknown',
                'created_at' => $review->created_at,
            ])
            ->all();
    }

    private function getRecentSignups(): array {
        return User::where('role', 'customer')
            ->latest()
            ->limit(5)
            ->get(['id', 'name', 'email', 'created_at'])
            ->map(fn ($user) => [
                'name' => $user->name,
                'email' => $user->email,
                'created_at' => $user->created_at,
            ])
            ->all();
    }

    private function getOrdersByStatus(): array {
        $counts = Order::select('status', DB::raw('COUNT(*) as total'))
            ->groupBy('status')
            ->pluck('total', 'status');

        $statuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

        return array_map(
            fn ($status) => [
                'status' => $status,
                'count' => (int) ($counts[$status] ?? 0),
            ],
            $statuses
        );
    }

    private function getRevenueLastSixMonths(): array {
        $startMonth = Carbon::now()->startOfMonth()->subMonths(5);

        $months = [];
        for ($index = 0; $index < 6; $index++) {
            $month = $startMonth->copy()->addMonths($index);
            $months[$month->format('Y-m')] = [
                'month' => $month->format('Y-m'),
                'label' => $month->format('M'),
                'total' => 0,
            ];
        }

        $paidOrders = Order::where('payment_status', 'paid')
            ->where('created_at', '>=', $startMonth)
            ->get(['grand_total', 'created_at']);

        foreach ($paidOrders as $order) {
            $key = $order->created_at->format('Y-m');

            if (isset($months[$key])) {
                $months[$key]['total'] += (float) $order->grand_total;
            }
        }

        return array_values($months);
    }

    private function getCustomersLastSixMonths(): array {
        $startMonth = Carbon::now()->startOfMonth()->subMonths(5);

        $months = [];
        for ($index = 0; $index < 6; $index++) {
            $month = $startMonth->copy()->addMonths($index);
            $months[$month->format('Y-m')] = [
                'month' => $month->format('Y-m'),
                'label' => $month->format('M'),
                'count' => 0,
            ];
        }

        $newCustomers = User::where('role', 'customer')
            ->where('created_at', '>=', $startMonth)
            ->get(['created_at']);

        foreach ($newCustomers as $customer) {
            $key = $customer->created_at->format('Y-m');

            if (isset($months[$key])) {
                $months[$key]['count']++;
            }
        }

        return array_values($months);
    }

    private function getTopVendors(): array {
        return OrderVendor::select('vendor_id', DB::raw('SUM(vendor_earning) as earning'))
            ->groupBy('vendor_id')
            ->orderByDesc('earning')
            ->limit(5)
            ->with('vendor:id,shop_name')
            ->get()
            ->map(fn ($row) => [
                'shop_name' => $row->vendor->shop_name ?? 'Unknown',
                'earning' => (float) $row->earning,
            ])
            ->all();
    }
}
