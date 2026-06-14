<?php

namespace App\Services;

use App\Models\Product;
use App\Models\ProductVariant;
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

        $slug = Str::slug($data['name']);
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

    public function getAllProducts(): LengthAwarePaginator {
        return $this->productRepository->getAllProducts();
    }

    public function getProductDetails(Product $product): Product {
        return $this->productRepository->getProductDetails($product);
    }

    public function getMyProducts(): LengthAwarePaginator
    {
        $vendorId = auth()->user()->vendorProfile->id;

        return $this->productRepository->getVendorProducts($vendorId);
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

    public function getPendingProducts(): LengthAwarePaginator {
        return $this->productRepository->getPendingProducts();
    }

    public function approveProduct(Product $product): Product {
        $this->productRepository->approveProduct($product);

        return $product->refresh();
    }

    public function rejectProduct(Product $product, string $rejectionReason): void {
        $this->productRepository->rejectProduct($product, $rejectionReason);
    }
}
