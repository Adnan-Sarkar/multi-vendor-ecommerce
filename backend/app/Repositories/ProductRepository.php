<?php

namespace App\Repositories;

use App\Models\Product;
use App\Models\ProductVariant;

class ProductRepository
{
    public function createProduct(array $data): Product
    {
        return Product::create($data);
    }

    public function addProductImages(Product $product, array $data): void {
        $product->images()->createMany($data['images']);
    }

    public function createProductVariant(Product $product, array $data): ProductVariant {
        return $product->variants()->create($data);
    }
}
