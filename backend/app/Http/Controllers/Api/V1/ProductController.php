<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Product\StoreProductImageRequest;
use App\Http\Requests\Api\V1\Product\StoreProductRequest;
use App\Http\Resources\Api\V1\ProductResource;
use App\Models\Product;
use App\Services\ProductService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Throwable;

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

    /**
     * @throws Throwable
     */
    public function store(StoreProductRequest $request): JsonResponse {
        $result = $this->productService->createProduct($request->validated());

        return $this->success(
            new ProductResource($result),
            'Product created successfully',
            201);
    }

    public function storeProductImages(StoreProductImageRequest $request, Product $product): JsonResponse {
        $result = $this->productService->addProductImages($product, $request->validated());

        return $this->success(
            new ProductResource($result),
            'Product images added successfully',
            201);
    }
}
