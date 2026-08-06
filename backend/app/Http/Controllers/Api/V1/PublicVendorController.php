<?php

namespace App\Http\Controllers\Api\V1;

use App\Exceptions\BaseException;
use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\ProductResource;
use App\Http\Resources\Api\V1\PublicVendorResource;
use App\Models\VendorProfile;
use App\Services\ProductService;
use App\Services\VendorService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PublicVendorController extends Controller
{
    use ApiResponse;

    protected VendorService $vendorService;
    protected ProductService $productService;

    /**
     * @param VendorService $vendorService
     * @param ProductService $productService
     */
    public function __construct(VendorService $vendorService, ProductService $productService)
    {
        $this->vendorService = $vendorService;
        $this->productService = $productService;
    }

    public function index(Request $request): JsonResponse {
        $filters = $request->only(['search', 'sort']);

        $result = $this->vendorService->getPublicVendors($filters);

        return $this->paginated(
            PublicVendorResource::collection($result),
            'Vendors retrieved successfully'
        );
    }

    /**
     * @throws BaseException
     */
    public function show(VendorProfile $vendorProfile): JsonResponse {
        $result = $this->vendorService->getVendorStorefront($vendorProfile);

        return $this->success(
            new PublicVendorResource($result),
            'Vendor details retrieved successfully'
        );
    }

    /**
     * @throws BaseException
     */
    public function products(Request $request, VendorProfile $vendorProfile): JsonResponse {
        if ($vendorProfile->status !== 'approved') {
            throw new BaseException('Vendor not found', 404);
        }

        $filters = $request->only([
            'search',
            'categories',
            'min_price',
            'max_price',
            'in_stock',
            'sort'
        ]);
        $filters['vendor_id'] = $vendorProfile->id;

        $result = $this->productService->getAllProducts($filters);

        return $this->paginated(
            ProductResource::collection($result),
            'Vendor products retrieved successfully'
        );
    }
}
