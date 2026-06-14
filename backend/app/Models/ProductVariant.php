<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductVariant extends Model
{
    protected $attributes = [
        'in_stock' => true,
    ];

    protected $fillable = [
        'sku',
        'price',
        'stock_qty',
        'in_stock',
        'image',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'in_stock' => 'boolean',
        ];
    }

    public function product() {
        return $this->belongsTo(Product::class);
    }

    public function attributeValues() {
        return $this->belongsToMany(ProductAttributeValue::class, 'product_variant_attributes', 'variant_id', 'attribute_value_id');
    }
}
