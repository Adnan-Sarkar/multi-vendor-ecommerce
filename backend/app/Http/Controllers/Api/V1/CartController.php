<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Cart\AddToCartRequest;
use App\Http\Requests\Api\V1\Cart\UpdateCartQuantityRequest;
use App\Http\Resources\Api\V1\CartItemResource;
use App\Http\Resources\Api\V1\CartResource;
use App\Models\CartItem;
use App\Services\CartService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;

class CartController extends Controller
{
    use ApiResponse;

    protected CartService $cartService;

    /**
     * @param CartService $cartService
     */
    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }

    public function addToCart(AddToCartRequest $request): JsonResponse {
        $result = $this->cartService->addToCart($request->validated());

        return $this->success(
            new CartResource($result),
            'Add to cart successfully'
        );
    }

    public function getCart(): JsonResponse {
        $result = $this->cartService->getCart();

        if (!$result) {
            return $this->success(null, 'Cart is empty');
        }

        return $this->success(
            new CartResource($result),
            'Cart retrieved successfully'
        );
    }

    public function updateCartItem(UpdateCartQuantityRequest $request, CartItem $cartItem): JsonResponse {
        $result = $this->cartService->updateCartItem($cartItem, $request->validated()['quantity']);

        return $this->success(
            new CartItemResource($result),
            'Cart item quantity updated successfully'
        );
    }

    public function removeCartItem(CartItem $cartItem): JsonResponse {
        $this->cartService->removeCartItem($cartItem);

        return $this->success(
            null,
            'Cart item removed successfully'
        );
    }

    public function clearCart(): JsonResponse {
        $this->cartService->clearCart();

        return $this->success(
            null,
            'Cart cleared successfully'
        );
    }
}
