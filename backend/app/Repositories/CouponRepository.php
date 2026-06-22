<?php

namespace App\Repositories;

use App\Models\Coupon;
use Illuminate\Pagination\LengthAwarePaginator;

class CouponRepository
{
    public function createCoupon(array $data): Coupon {
        return Coupon::create($data);
    }

    public function findByCode(string $code): ?Coupon {
        return Coupon::where('code', $code)->first();
    }

    public function getVendorCoupons(int $vendorId): LengthAwarePaginator {
        return Coupon::where('vendor_id', $vendorId)->paginate(20);
    }

    public function getAllCoupons(): LengthAwarePaginator {
        return Coupon::with('vendor')->paginate(20);
    }

    public function deleteCoupon(Coupon $coupon): void {
        $coupon->delete();
    }
}
