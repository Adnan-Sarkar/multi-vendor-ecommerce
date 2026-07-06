<?php

namespace App\Services;

use App\Exceptions\BaseException;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Repositories\CartRepository;

class CartService
{
    protected CartRepository $cartRepository;

    /**
     * @param CartRepository $cartRepository
     */
    public function __construct(CartRepository $cartRepository)
    {
        $this->cartRepository = $cartRepository;
    }

    /**
     * @throws BaseException
     */
    public function addToCart(array $data): Cart {
        $userId = auth()->user()->id;
        $cart = $this->cartRepository->getOrCreateCart($userId);

        $product = Product::find($data['product_id']);

        if (!$product->in_stock) {
            throw new BaseException('Product is out of stock', 400);
        }

        if ($product->manage_stock && $product->stock_qty < $data['quantity']) {
            throw new BaseException('Not enough stock available. Only ' . $product->stock_qty . ' left', 400);
        }

        if (isset($data['variant_id'])) {
            $price = ProductVariant::find($data['variant_id'])->price;
        } else {
            $price = $product->sale_price ?? $product->regular_price;
        }

        $data['unit_price'] = $price;

        return $this->cartRepository->addItem($cart, $data);
    }

    public function getCart(): ?Cart
    {
        $userId = auth()->user()->id;

        return $this->cartRepository->getCart($userId);
    }

    public function updateCartItem(CartItem $cartItem, int $quantity): CartItem {
        return $this->cartRepository->updateCartItem($cartItem, $quantity);
    }

    public function removeCartItem(CartItem $cartItem): void {
        $this->cartRepository->removeCartItem($cartItem);
    }

    public function clearCart(): void {
        $userId = auth()->user()->id;

        $cart = $this->cartRepository->getOrCreateCart($userId);
        $this->cartRepository->clearCart($cart);
    }
}
