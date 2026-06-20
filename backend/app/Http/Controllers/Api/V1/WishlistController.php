<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Wishlist\StoreWishlistRequest;
use App\Http\Resources\Api\V1\WishlistResource;
use App\Models\Product;
use App\Services\WishlistService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    use ApiResponse;

    protected WishlistService $wishlistService;

    /**
     * @param WishlistService $wishlistService
     */
    public function __construct(WishlistService $wishlistService)
    {
        $this->wishlistService = $wishlistService;
    }

    public function index(): JsonResponse {
        $result = $this->wishlistService->getWishlists();

        return $this->paginated(
            WishlistResource::collection($result),
            'Wishlist retrieved successfully'
        );
    }

    public function store(StoreWishlistRequest $request): JsonResponse {
        $this->wishlistService->addToWishlist(
            $request->validated()['product_id']
        );

        return $this->success(
            null,
            'Product added to wishlist successfully'
        );
    }

    public function destroy(Product $product): JsonResponse {
        $this->wishlistService->removeFromWishlist($product->id);

        return $this->success(
            null,
            'Product removed from wishlist successfully'
        );
    }
}
