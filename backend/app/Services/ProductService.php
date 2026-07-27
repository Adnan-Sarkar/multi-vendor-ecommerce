<?php

namespace App\Services;

use App\Exceptions\BaseException;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Notifications\ProductApprovedNotification;
use App\Repositories\ProductRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use \Illuminate\Pagination\LengthAwarePaginator;
use Throwable;

class ProductService
{
    protected ProductRepository $productRepository;

    /**
     * @param ProductRepository $productRepository
     */
    public function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    /**
     * @throws Throwable
     */
    public function createProduct(array $data): Product {
        $user = auth()->user();

        $slug = $this->generateUniqueSlug($data['name']);
        $sku = strtoupper(Str::slug($data['name'], '-')) . '-' . Str::random(8);

        $data['vendor_id'] = $user->vendorProfile->id;
        $data['slug'] = $slug;
        $data['sku'] = $sku;

        $categories = $data['categories'];
        $tags = $data['tags'] ?? [];
        unset($data['categories'], $data['tags']);

        return DB::transaction(function () use ($data, $categories, $tags) {
            $product = $this->productRepository->createProduct($data);

            $product->categories()->attach($categories);
            if (!empty($tags)) {
                $product->tags()->attach($tags);
            }

            return $product->load(['categories', 'tags', 'vendor']);
        });
    }

    public function getAllProducts(array $filters = []): LengthAwarePaginator {
        return $this->productRepository->getAllProducts($filters);
    }

    /**
     * @throws BaseException
     */
    public function getProductDetails(Product $product): Product {
        if ($product->status !== 'approved') {
            throw new BaseException('Product not found', 404);
        }

        $product->increment('views');

        return $this->productRepository->getProductDetails($product);
    }

    public function getMyProducts(): LengthAwarePaginator
    {
        $vendorId = auth()->user()->vendorProfile->id;

        return $this->productRepository->getVendorProducts($vendorId);
    }

    /**
     * @throws BaseException
     */
    public function getMyProduct(Product $product): Product {
        $vendorId = auth()->user()->vendorProfile->id;

        if ($product->vendor_id !== $vendorId) {
            throw new BaseException('Product not found', 404);
        }

        return $this->productRepository->getVendorProductDetails($product);
    }

    /**
     * @throws Throwable
     */
    public function updateProduct(Product $product, array $data): Product {
        if (isset($data['name'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        $categories = $data['categories'] ?? [];
        $tags = $data['tags'] ?? [];
        unset($data['categories'], $data['tags']);

        return DB::transaction(function () use ($product, $data, $categories, $tags) {
            $this->productRepository->updateProduct($product, $data);

            if (!empty($categories)) {
                $product->categories()->sync($categories);
            }
            if (!empty($tags)) {
                $product->tags()->sync($tags);
            }

            return $product->load(['categories', 'tags', 'images', 'vendor']);
        });
    }

    public function deleteProduct(Product $product): void {
        $this->productRepository->deleteProduct($product);
    }

    public function addProductImages(Product $product, array $data): Product {
        $this->productRepository->addProductImages($product, $data);

        return $product->load('images');
    }

    /**
     * @throws Throwable
     */
    public function createProductVariant(Product $product, array $data): ProductVariant {
        $data['sku'] = $product->sku . '-' . Str::random(6);

        $attributeIds = $data['attributes'];
        unset($data['attributes']);

        return DB::transaction(function () use ($product, $data, $attributeIds) {
            $productVariant = $this->productRepository->createProductVariant($product, $data);

            $productVariant->attributeValues()->attach($attributeIds);

            return $productVariant->load('attributeValues.attribute');
        });
    }

    public function getProductVariants(Product $product) {
        return $this->productRepository->getProductVariants($product);
    }

    /**
     * @throws BaseException
     * @throws Throwable
     */
    public function updateProductVariant(Product $product, ProductVariant $variant, array $data): ProductVariant {
        $this->authorizeVariant($product, $variant);

        $attributeIds = $data['attributes'] ?? null;
        unset($data['attributes']);

        return DB::transaction(function () use ($variant, $data, $attributeIds) {
            $this->productRepository->updateProductVariant($variant, $data);

            if (!is_null($attributeIds)) {
                $variant->attributeValues()->sync($attributeIds);
            }

            return $variant->load('attributeValues.attribute');
        });
    }

    /**
     * @throws BaseException
     */
    public function deleteProductVariant(Product $product, ProductVariant $variant): void {
        $this->authorizeVariant($product, $variant);

        $this->productRepository->deleteProductVariant($variant);
    }

    /**
     * @throws BaseException
     */
    private function authorizeVariant(Product $product, ProductVariant $variant): void {
        $vendorId = auth()->user()->vendorProfile->id;

        if ($product->vendor_id !== $vendorId || $variant->product_id !== $product->id) {
            throw new BaseException('Variant not found', 404);
        }
    }

    private function generateUniqueSlug(string $name): string {
        $baseSlug = Str::slug($name);
        $slug = $baseSlug;
        $counter = 2;

        while (Product::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $counter;
            $counter++;
        }

        return $slug;
    }

    public function getPendingProducts(): LengthAwarePaginator {
        return $this->productRepository->getPendingProducts();
    }

    public function getAdminProducts(array $filters = []): LengthAwarePaginator {
        return $this->productRepository->getAdminProducts($filters);
    }

    public function approveProduct(Product $product): Product {
        $this->productRepository->approveProduct($product);

        $product->vendor->user
            ->notify(new ProductApprovedNotification($product));

        return $product->refresh();
    }

    public function rejectProduct(Product $product, string $rejectionReason): void {
        $this->productRepository->rejectProduct($product, $rejectionReason);
    }
}
