<?php

namespace App\Repositories;

use App\Models\Product;
use App\Models\ProductVariant;
use \Illuminate\Pagination\LengthAwarePaginator;

class ProductRepository
{
    public function createProduct(array $data): Product
    {
        return Product::create($data);
    }

    public function getAllProducts(array $filters = []): LengthAwarePaginator
    {
        $query = Product::where('status', 'approved')
            ->with(['images', 'tags', 'categories', 'vendor:id,shop_name,slug,status'])
            ->withCount('reviews');

        if (!empty($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('name', 'ilike', "%{$filters['search']}%")
                    ->orWhere('sku', 'ilike', "%{$filters['search']}%")
                    ->orWhere('short_description', 'ilike', "%{$filters['search']}%");
            });
        }

        if (!empty($filters['categories'])) {
            $query->whereHas('categories', function ($q) use ($filters) {
                $q->whereIn('slug', $filters['categories']);
            });
        }

        if (!empty($filters['tags'])) {
            $query->whereHas('tags', function ($q) use ($filters) {
                $q->where('slug', $filters['tags']);
            });
        }

        if (!empty($filters['min_price']) || !empty($filters['max_price'])) {
            $query->whereBetween('regular_price', [
                $filters['min_price'] ?? 0,
                $filters['max_price'] ?? PHP_INT_MAX,
            ]);
        }

        if (!empty($filters['vendor_id'])) {
            $query->where('vendor_id', $filters['vendor_id']);
        }

        if (isset($filters['featured'])) {
            $query->where('is_featured',
                filter_var($filters['featured'], FILTER_VALIDATE_BOOLEAN),
            );
        }

        if (isset($filters['in_stock'])) {
            $query->where('in_stock',
                filter_var($filters['in_stock'], FILTER_VALIDATE_BOOLEAN));
        }

        switch ($filters['sort'] ?? null) {
            case 'price_asc':
                $query->orderBy('regular_price');
                break;

            case 'price_desc':
                $query->orderByDesc('regular_price');
                break;

            case 'popular':
                $query->orderByDesc('views');
                break;

            case 'newest':
                $query->latest();
                break;

            case 'oldest':
                $query->oldest();
                break;
        }

        return $query->paginate(20);
    }

    public function getProductDetails(Product $product): Product
    {
        return $product->load([
            'vendor',
            'categories',
            'tags',
            'images',
            'variants',
            'reviews',
            ]);
    }

    public function updateProduct(Product $product, array $data): void {
        $product->update($data);
    }

    public function deleteProduct(Product $product): void {
        $product->delete();
    }

    public function getVendorProducts(int $vendorId): LengthAwarePaginator
    {
        return Product::where('vendor_id', $vendorId)
            ->with(['categories', 'images', 'tags', 'variants'])
            ->paginate(20);
    }

    public function getVendorProductDetails(Product $product): Product
    {
        return $product->load(['categories', 'tags', 'images', 'vendor']);
    }

    public function addProductImages(Product $product, array $data): void {
        $product->images()->createMany($data['images']);
    }

    public function createProductVariant(Product $product, array $data): ProductVariant {
        return $product->variants()->create($data);
    }

    public function getProductVariants(Product $product) {
        return $product->variants()
            ->with('attributeValues.attribute')
            ->get();
    }

    public function updateProductVariant(ProductVariant $variant, array $data): void {
        $variant->update($data);
    }

    public function deleteProductVariant(ProductVariant $variant): void {
        $variant->delete();
    }

    public function getPendingProducts(): LengthAwarePaginator {
        return Product::where('status', 'pending')
            ->with(['images', 'vendor', 'categories', 'variants'])
            ->paginate(20);
    }

    public function getAdminProducts(array $filters = []): LengthAwarePaginator {
        $query = Product::with(['images', 'vendor', 'categories', 'variants'])
            ->withCount('reviews');

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        return $query->latest()->paginate(20);
    }

    public function approveProduct(Product $product): void {
        $product->update([
            'status' => 'approved',
            'approved_at' => now(),
        ]);
    }

    public function rejectProduct(Product $product, string $rejectionReason): void {
        $product->update([
            'status' => 'rejected',
            'rejection_reason' => $rejectionReason,
        ]);
    }
}
