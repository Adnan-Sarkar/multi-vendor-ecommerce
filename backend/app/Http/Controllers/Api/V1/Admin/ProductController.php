<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\ProductResource;
use App\Models\Product;
use App\Services\ProductService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    use ApiResponse;

    protected ProductService $productService;

    /**
     * @param ProductService $productService
     */
    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function index(Request $request): JsonResponse {
        $filters = $request->only(['status']);

        $result = $this->productService->getAdminProducts($filters);

        return $this->paginated(
            ProductResource::collection($result),
            'Products retrieved successfully'
        );
    }

    public function approve( Product $product): JsonResponse {
        $result = $this->productService->approveProduct($product);

        return $this->success(
            new ProductResource($result),
            'Products approved successfully'
        );
    }

    public function reject(Request $request, Product $product): JsonResponse {
        $request->validate([
            'rejection_reason' => 'required|string|min:10',
        ]);

        $this->productService->rejectProduct($product, $request->rejection_reason);

        return $this->success(null, 'Product rejected successfully');
    }
}
