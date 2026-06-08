<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    protected $fillable = [
        'order_id',
        'order_vendor_id',
        'product_id',
        'variant_id',
        'product_name',
        'product_sku',
        'variant_details',
        'quantity',
        'unit_price',
        'total',
    ];

    protected function casts(): array
    {
        return [
            'variant_details' => 'json',
            'unit_price' => 'decimal:2',
            'total' => 'decimal:2',
        ];
    }

    public function order() {
        return $this->belongsTo(Order::class);
    }

    public function orderVendor() {
        return $this->belongsTo(OrderVendor::class);
    }

    public function product() {
        return $this->belongsTo(Product::class);
    }

    public function variant() {
        return $this->belongsTo(ProductVariant::class);
    }
}
