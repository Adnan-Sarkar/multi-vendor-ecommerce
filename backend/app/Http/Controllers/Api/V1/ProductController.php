<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Product\StoreProductImageRequest;
use App\Http\Requests\Api\V1\Product\StoreProductRequest;
use App\Http\Requests\Api\V1\Product\StoreProductVariantRequest;
use App\Http\Requests\Api\V1\Product\UpdateProductRequest;
use App\Http\Resources\Api\V1\ProductResource;
use App\Http\Resources\Api\V1\ProductVariantResource;
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

    public function myProducts(): JsonResponse {
        $result = $this->productService->getMyProducts();

        return $this->paginated(
            ProductResource::collection($result),
            'Products retrieved successfully'
        );
    }

    /**
     * @throws Throwable
     */
    public function update(UpdateProductRequest $request, Product $product): JsonResponse {
        $result = $this->productService->updateProduct($product, $request->validated());

        return $this->success(
            new ProductResource($result),
            'Product updated successfully');
    }

    public function destroy(Product $product): JsonResponse {
        $this->productService->deleteProduct($product);

        return $this->success(
            null,
            'Product deleted successfully');
    }

    public function storeProductImages(StoreProductImageRequest $request, Product $product): JsonResponse {
        $result = $this->productService->addProductImages($product, $request->validated());

        return $this->success(
            new ProductResource($result),
            'Product images added successfully',
            201);
    }

    /**
     * @throws Throwable
     */
    public function storeProductVariant(StoreProductVariantRequest $request, Product $product): JsonResponse {
        $result = $this->productService->createProductVariant($product, $request->validated());

        return $this->success(
            new ProductVariantResource($result),
            'Product variant added successfully',
            201);
    }
}
