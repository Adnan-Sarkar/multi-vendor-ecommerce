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
        $variant = isset($data['variant_id'])
            ? ProductVariant::find($data['variant_id'])
            : null;

        $existingQuantity = $cart->cartItems()
            ->where('product_id', $data['product_id'])
            ->where('variant_id', $data['variant_id'] ?? null)
            ->value('quantity') ?? 0;

        $this->assertStockAvailable($product, $variant, $existingQuantity + $data['quantity']);

        $data['unit_price'] = $variant
            ? $variant->price
            : ($product->sale_price ?? $product->regular_price);

        return $this->cartRepository->addItem($cart, $data);
    }

    public function getCart(): ?Cart
    {
        $userId = auth()->user()->id;

        return $this->cartRepository->getCart($userId);
    }

    /**
     * @throws BaseException
     */
    public function updateCartItem(CartItem $cartItem, int $quantity): CartItem {
        $this->assertStockAvailable($cartItem->product, $cartItem->variant, $quantity);

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

    /**
     * @throws BaseException
     */
    private function assertStockAvailable(Product $product, ?ProductVariant $variant, int $quantity): void {
        if ($variant) {
            if (!$variant->in_stock) {
                throw new BaseException('This variant is out of stock', 400);
            }

            if ($variant->stock_qty < $quantity) {
                throw new BaseException('Not enough stock available. Only ' . $variant->stock_qty . ' left', 400);
            }

            return;
        }

        if (!$product->in_stock) {
            throw new BaseException('Product is out of stock', 400);
        }

        if ($product->manage_stock && $product->stock_qty < $quantity) {
            throw new BaseException('Not enough stock available. Only ' . $product->stock_qty . ' left', 400);
        }
    }
}
