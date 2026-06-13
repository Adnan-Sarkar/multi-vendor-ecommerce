<?php

namespace App\Services;

use App\Models\Product;
use App\Repositories\ProductRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

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
     * @throws \Throwable
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

    public function addProductImages(Product $product, array $data): Product {
        $this->productRepository->addProductImages($product, $data);

        return $product->load('images');
    }
}
