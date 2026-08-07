<?php

namespace App\Http\Controllers\Api\V1;

use App\Exceptions\BaseException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Product\StoreProductImageRequest;
use App\Http\Requests\Api\V1\Product\StoreProductRequest;
use App\Http\Requests\Api\V1\Product\StoreProductVariantRequest;
use App\Http\Requests\Api\V1\Product\UpdateProductRequest;
use App\Http\Requests\Api\V1\Product\UpdateProductVariantRequest;
use App\Http\Resources\Api\V1\ProductResource;
use App\Http\Resources\Api\V1\ProductVariantResource;
use App\Http\Resources\Api\V1\ReviewResource;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Services\ProductService;
use App\Services\ReviewService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Throwable;

class ProductController extends Controller
{
    use ApiResponse;

    protected ProductService $productService;
    protected ReviewService $reviewService;

    /**
     * @param ProductService $productService
     * @param ReviewService $reviewService
     */
    public function __construct(ProductService $productService, ReviewService $reviewService)
    {
        $this->productService = $productService;
        $this->reviewService = $reviewService;
    }


    public function index(Request $request): JsonResponse {
        $filters = $request->only([
            'search',
            'categories',
            'tags',
            'min_price',
            'max_price',
            'vendor_id',
            'featured',
            'in_stock',
            'on_sale',
            'sort'
        ]);

        $result = $this->productService->getAllProducts($filters);

        return $this->paginated(
            ProductResource::collection($result),
            'Products retrieved successfully'
        );
    }

    /**
     * @throws BaseException
     */
    public function show(Product $product): JsonResponse {
        $result = $this->productService->getProductDetails($product);

        return $this->success(
            new ProductResource($result),
            'Product details retrieved successfully'
        );
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
     * @throws BaseException
     */
    public function showMyProduct(Product $product): JsonResponse {
        $result = $this->productService->getMyProduct($product);

        return $this->success(
            new ProductResource($result),
            'Product retrieved successfully'
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

    public function getProductReviews(Product $product): JsonResponse {
        $result = $this->reviewService->getProductReviews($product->id);

        return $this->paginated(
            ReviewResource::collection($result),
            'Product reviews retrieved successfully'
        );
    }

    public function getProductVariants(Product $product): JsonResponse {
        $result = $this->productService->getProductVariants($product);

        return $this->success(
            ProductVariantResource::collection($result),
            'Product variants retrieved successfully'
        );
    }

    /**
     * @throws BaseException
     * @throws Throwable
     */
    public function updateProductVariant(UpdateProductVariantRequest $request, Product $product, ProductVariant $variant): JsonResponse {
        $result = $this->productService->updateProductVariant($product, $variant, $request->validated());

        return $this->success(
            new ProductVariantResource($result),
            'Product variant updated successfully'
        );
    }

    /**
     * @throws BaseException
     */
    public function destroyProductVariant(Product $product, ProductVariant $variant): JsonResponse {
        $this->productService->deleteProductVariant($product, $variant);

        return $this->success(
            null,
            'Product variant deleted successfully'
        );
    }
}
