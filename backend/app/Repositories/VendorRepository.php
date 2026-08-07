<?php

namespace App\Repositories;

use App\Models\User;
use App\Models\VendorProfile;
use Illuminate\Pagination\LengthAwarePaginator;

class VendorRepository
{
    public function getPendingVendors(): LengthAwarePaginator {
        return VendorProfile::where('status', 'pending')
            ->with('user')
            ->latest()
            ->paginate(20);
    }

    public function getVendors(?string $status = null): LengthAwarePaginator {
        $query = VendorProfile::with('user');

        if (in_array($status, ['pending', 'approved', 'rejected'], true)) {
            $query->where('status', $status);
        }

        return $query->latest()->paginate(20);
    }

    public function getPublicVendors(array $filters = []): LengthAwarePaginator {
        $query = VendorProfile::where('status', 'approved')
            ->withCount(['products' => fn ($productQuery) => $productQuery->where('status', 'approved')])
            ->withCount(['reviews' => fn ($reviewQuery) => $reviewQuery->where('is_approved', true)])
            ->withAvg(['reviews' => fn ($reviewQuery) => $reviewQuery->where('is_approved', true)], 'rating');

        if (!empty($filters['search'])) {
            $query->where('shop_name', 'ilike', "%{$filters['search']}%");
        }

        switch ($filters['sort'] ?? null) {
            case 'rating':
                $query->orderByDesc('reviews_avg_rating');
                break;

            case 'products':
                $query->orderByDesc('products_count');
                break;

            case 'oldest':
                $query->oldest();
                break;

            case 'newest':
            default:
                $query->latest();
                break;
        }

        return $query->paginate(20);
    }

    public function getPublicVendorWithStats(VendorProfile $vendorProfile): VendorProfile {
        $vendorProfile->loadCount([
            'products' => fn ($productQuery) => $productQuery->where('status', 'approved'),
            'reviews' => fn ($reviewQuery) => $reviewQuery->where('is_approved', true),
        ])->loadAvg(['reviews' => fn ($reviewQuery) => $reviewQuery->where('is_approved', true)], 'rating');

        $totalOrders = $vendorProfile->orderVendors()->count();
        $completedOrders = $vendorProfile->orderVendors()->where('status', 'delivered')->count();

        $vendorProfile->stats = [
            'products_count' => $vendorProfile->products_count,
            'average_rating' => round((float) $vendorProfile->reviews_avg_rating, 1),
            'review_count' => $vendorProfile->reviews_count,
            'total_orders' => $totalOrders,
            'completed_orders' => $completedOrders,
            'completion_rate' => $totalOrders > 0
                ? (int) round($completedOrders / $totalOrders * 100)
                : 0,
        ];

        return $vendorProfile;
    }

    public function approveVendor(VendorProfile $vendorProfile): VendorProfile {
        $vendorProfile->update(
            [
                'status' => 'approved',
                'approved_at' => now(),
            ]
        );

        return $vendorProfile->load('user');
    }

    public function rejectVendor(VendorProfile $vendorProfile, string $reason): void {
        $vendorProfile->update([
            'status' => 'rejected',
            'rejection_reason' => $reason,
        ]);
    }
}
