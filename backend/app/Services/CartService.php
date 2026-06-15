<?php

namespace App\Services;

use App\Models\Cart;
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

    public function addToCart(array $data): Cart {
        $userId = auth()->user()->id;
        $cart = $this->cartRepository->getOrCreateCart($userId);

        $product = Product::find($data['product_id']);

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
}
