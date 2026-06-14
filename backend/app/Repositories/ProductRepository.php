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

    public function getAllProducts(): LengthAwarePaginator
    {
        return Product::where('status', 'approved')
            ->with(['images', 'tags', 'categories', 'vendor'])
            ->paginate(20);
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

    public function addProductImages(Product $product, array $data): void {
        $product->images()->createMany($data['images']);
    }

    public function createProductVariant(Product $product, array $data): ProductVariant {
        return $product->variants()->create($data);
    }
}
