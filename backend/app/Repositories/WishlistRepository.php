<?php

namespace App\Repositories;

use App\Models\Wishlist;
use Illuminate\Pagination\LengthAwarePaginator;

class WishlistRepository
{
    public function getWishlists(int $userId): LengthAwarePaginator {
        return Wishlist::where('user_id', $userId)
            ->with(['product'])
            ->paginate(20);
    }

    public function addToWishlist(int $productId, int $userId): void {
        Wishlist::firstOrCreate([
            'user_id' => $userId,
            'product_id' => $productId,
        ]);
    }

    public function removeFromWishlist(int $productId, int $userId): void {
        Wishlist::where('user_id', $userId)
            ->where('product_id', $productId)
            ->delete();
    }
}
