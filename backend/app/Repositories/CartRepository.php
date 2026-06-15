<?php

namespace App\Repositories;

use App\Models\Cart;
use App\Models\CartItem;

class CartRepository
{
    public function getOrCreateCart(int $userId): Cart
    {
        return Cart::firstOrCreate([
            'user_id' => $userId
        ]);
    }

    public function addItem(Cart $cart, array $data): Cart
    {
        $alreadyExists = $cart->cartItems()->where([
            'product_id' => $data['product_id'],
            'variant_id' => $data['variant_id'] ?? null,
        ])->first();

        if ($alreadyExists) {
            $alreadyExists->increment('quantity', $data['quantity']);
        } else {
            $cart->cartItems()->create($data);
        }

        return $cart->load(['cartItems.product.images', 'cartItems.variant']);
    }

    public function getCart(int $userId): Cart|null
    {
        return Cart::where('user_id', $userId)
            ->with(['cartItems.product.images', 'cartItems.variant'])
            ->first();
    }

    public function updateCartItem(CartItem $cartItem, int $quantity): CartItem {
        $cartItem->update([
            'quantity' => $quantity
        ]);

        return $cartItem->load(['product']);
    }

    public function removeCartItem(CartItem $cartItem): void {
        $cartItem->delete();
    }

    public function clearCart(Cart $cart): void {
        $cart->cartItems()->delete();
    }
}
