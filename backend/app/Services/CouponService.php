<?php

namespace App\Services;

use App\Exceptions\BaseException;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Coupon;
use App\Repositories\CartRepository;
use App\Repositories\CouponRepository;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Carbon;

class CouponService
{
    protected CouponRepository $couponRepository;

    protected CartRepository $cartRepository;

    /**
     * @param CouponRepository $couponRepository
     * @param CartRepository $cartRepository
     */
    public function __construct(CouponRepository $couponRepository, CartRepository $cartRepository)
    {
        $this->couponRepository = $couponRepository;
        $this->cartRepository = $cartRepository;
    }

    /**
     * @throws BaseException
     */
    public function applyCoupon(string $code): array {
        $coupon = $this->couponRepository->findByCode($code);

        if (!$coupon) {
            throw new BaseException('Coupon does not exist', 404);
        }

        if (!$coupon->is_active) {
            throw new BaseException('Coupon is not active', 400);
        }

        if ($coupon->starts_at && Carbon::parse($coupon->starts_at)->isFuture()) {
            throw new BaseException('Coupon has not started yet', 400);
        }

        if ($coupon->expires_at && Carbon::parse($coupon->expires_at)->isPast()) {
            throw new BaseException('Coupon has expired', 400);
        }

        if ($coupon->max_uses && $coupon->used_count >= $coupon->max_uses) {
            throw new BaseException('Coupon has reached maximum usage limit', 400);
        }

        $userId = auth()->user()->id;
        $userUsageCount = $coupon->couponUsages()->where('user_id', $userId)->count();

        if ($userUsageCount >= $coupon->max_uses_per_user) {
            throw new BaseException('You have already used this coupon the maximum number of times', 400);
        }

        $cart = $this->cartRepository->getCart($userId);
        $cartSubtotal = $this->calculateCartSubtotal($cart);
        $vendorSubtotal = $this->calculateVendorSubtotal($cart, $coupon->vendor_id);

        if ($vendorSubtotal <= 0) {
            throw new BaseException('This coupon is not valid for any items in your cart', 400);
        }

        if ($coupon->min_order_amount && $vendorSubtotal < $coupon->min_order_amount) {
            throw new BaseException('Order amount does not meet the minimum requirement of ' . $coupon->min_order_amount, 400);
        }

        $discount = $this->calculateDiscount($coupon, $vendorSubtotal);

        return [
            'coupon' => $coupon,
            'discount' => $discount,
            'subtotal' => $cartSubtotal,
            'final_total' => $cartSubtotal - $discount,
        ];
    }

    private function calculateCartSubtotal(?Cart $cart): float {
        if (!$cart) {
            return 0;
        }

        return $cart->cartItems->sum(function (CartItem $cartItem) {
            return $cartItem->unit_price * $cartItem->quantity;
        });
    }

    private function calculateVendorSubtotal(?Cart $cart, int $vendorId): float {
        if (!$cart) {
            return 0;
        }

        return $cart->cartItems
            ->filter(function (CartItem $cartItem) use ($vendorId) {
                return $cartItem->product && (int) $cartItem->product->vendor_id === $vendorId;
            })
            ->sum(function (CartItem $cartItem) {
                return $cartItem->unit_price * $cartItem->quantity;
            });
    }

    private function calculateDiscount(Coupon $coupon, float $vendorSubtotal): float {
        if ($coupon->type === 'percentage') {
            $discount = ($vendorSubtotal * $coupon->value) / 100;

            if ($coupon->max_discount_amount) {
                $discount = min($discount, $coupon->max_discount_amount);
            }
        } else {
            $discount = $coupon->value;
        }

        return min($discount, $vendorSubtotal);
    }

    public function createCoupon(array $data): Coupon {
        $data['vendor_id'] = auth()->user()->vendorProfile->id;

        return $this->couponRepository->createCoupon($data);
    }

    public function getVendorCoupons(): LengthAwarePaginator {
        $vendorId = auth()->user()->vendorProfile->id;
        return $this->couponRepository->getVendorCoupons($vendorId);
    }

    public function getAllCoupons(): LengthAwarePaginator {
        return $this->couponRepository->getAllCoupons();
    }

    public function deleteCoupon(Coupon $coupon): void {
        $this->couponRepository->deleteCoupon($coupon);
    }
}
