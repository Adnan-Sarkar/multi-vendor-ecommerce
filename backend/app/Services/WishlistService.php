<?php

namespace App\Services;

use App\Repositories\WishlistRepository;
use Illuminate\Pagination\LengthAwarePaginator;

class WishlistService
{
    protected WishlistRepository $wishlistRepository;

    /**
     * @param WishlistRepository $wishlistRepository
     */
    public function __construct(WishlistRepository $wishlistRepository)
    {
        $this->wishlistRepository = $wishlistRepository;
    }

    public function getWishlists(): LengthAwarePaginator {
        $userId = auth()->user()->id;

        return $this->wishlistRepository->getWishlists($userId);
    }

    public function addToWishlist(int $productId): void {
        $userId = auth()->user()->id;

        $this->wishlistRepository->addToWishlist($productId, $userId);
    }

    public function removeFromWishlist(int $productId): void {
        $userId = auth()->user()->id;

        $this->wishlistRepository->removeFromWishlist($productId, $userId);
    }
}
