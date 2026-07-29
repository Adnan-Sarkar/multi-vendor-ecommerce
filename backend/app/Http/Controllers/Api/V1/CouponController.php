<?php

namespace App\Http\Controllers\Api\V1;

use App\Exceptions\BaseException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Coupon\ApplyCouponRequest;
use App\Http\Requests\Api\V1\Coupon\StoreCouponRequest;
use App\Http\Resources\Api\V1\CouponResource;
use App\Models\Coupon;
use App\Services\CouponService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;

class CouponController extends Controller
{
    use ApiResponse;

    protected CouponService $couponService;

    /**
     * @param CouponService $couponService
     */
    public function __construct(CouponService $couponService)
    {
        $this->couponService = $couponService;
    }

    public function store(StoreCouponRequest $request): JsonResponse {
        $result = $this->couponService->createCoupon($request->validated());

        return $this->success(
            new CouponResource($result),
            'Coupon created successfully',
            201
        );
    }

    public function vendorIndex(): JsonResponse {
        $result = $this->couponService->getVendorCoupons();

        return $this->paginated(
            CouponResource::collection($result),
            'Vendor coupons retrieved successfully'
        );
    }

    public function adminIndex(): JsonResponse {
        $result = $this->couponService->getAllCoupons();

        return $this->paginated(
            CouponResource::collection($result),
            'Coupons retrieved successfully'
        );
    }

    public function destroy(Coupon $coupon): JsonResponse {
        $this->couponService->deleteCoupon($coupon);

        return $this->success(
            null,
            'Coupon deleted successfully'
        );
    }

    /**
     * @throws BaseException
     */
    public function applyCoupon(ApplyCouponRequest $request): JsonResponse {
        $data = $request->validated();
        $result = $this->couponService->applyCoupon($data['code']);

        return $this->success(
            [
            'coupon' => new CouponResource($result['coupon']),
            'discount' => $result['discount'],
            'subtotal' => $result['subtotal'],
            'final_total' => $result['final_total'],
            ],
            'Coupon applied successfully'
        );
    }
}
