<?php

namespace App\Services;

use App\Exceptions\BaseException;
use App\Models\Coupon;
use App\Repositories\CouponRepository;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Carbon;

class CouponService
{
    protected CouponRepository $couponRepository;

    /**
     * @param CouponRepository $couponRepository
     */
    public function __construct(CouponRepository $couponRepository)
    {
        $this->couponRepository = $couponRepository;
    }

    /**
     * @throws BaseException
     */
    public function applyCoupon(string $code, float $subtotal): array {
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

        if ($coupon->min_order_amount && $subtotal < $coupon->min_order_amount) {
            throw new BaseException('Order amount does not meet the minimum requirement of ' . $coupon->min_order_amount, 400);
        }

        // Calculate discount
        if ($coupon->type === 'percentage') {
            $discount = ($subtotal * $coupon->value) / 100;
            if ($coupon->max_discount_amount) {
                $discount = min($discount, $coupon->max_discount_amount);
            }
        } else {
            $discount = $coupon->value;
        }

        return [
            'coupon' => $coupon,
            'discount' => $discount,
        ];
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
