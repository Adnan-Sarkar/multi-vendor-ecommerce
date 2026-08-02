<?php

namespace App\Repositories;

use App\Models\Review;
use Illuminate\Pagination\LengthAwarePaginator;

class ReviewRepository
{
    public function createReview(array $data): Review {
        $review = Review::create($data);
        return $review->load(['product', 'user']);
    }

    public function userHasReviewed(int $userId, int $productId, int $orderId): bool {
        return Review::where('user_id', $userId)
            ->where('product_id', $productId)
            ->where('order_id', $orderId)
            ->exists();
    }

    public function getProductReviews(int $productId): LengthAwarePaginator {
        return Review::where('product_id', $productId)
            ->where('is_approved', true)
            ->with('user')
            ->latest()
            ->paginate(10);
    }

    public function getAdminReviews(array $filters = []): LengthAwarePaginator {
        $query = Review::with(['user', 'product.vendor']);

        if (($filters['status'] ?? null) === 'approved') {
            $query->where('is_approved', true);
        } elseif (($filters['status'] ?? null) === 'pending') {
            $query->where('is_approved', false);
        }

        return $query->latest()->paginate(20);
    }

    public function approveReview(Review $review): void {
        $review->update(['is_approved' => true]);
    }

    public function getVendorProductReviews(int $productId): LengthAwarePaginator {
        return Review::where('product_id', $productId)
            ->with('user')
            ->latest()
            ->paginate(10);
    }

    public function addVendorReply(Review $review, string $reply): Review {
        $review->update([
            'vendor_reply' => $reply,
            'vendor_replied_at' => now(),
        ]);

        return $review->load('user');
    }
}
