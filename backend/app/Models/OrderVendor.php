<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderVendor extends Model
{
    protected $attributes = [
        'status' => 'pending',
        'shipping_cost' => 0,
        'commission' => 0,
        'vendor_earning' => 0,
    ];

    protected $fillable = [
        'order_id',
        'vendor_id',
        'subtotal',
        'shipping_cost',
        'commission',
        'vendor_earning',
        'status',
        'tracking_number',
        'shipped_at',
        'delivered_at',
    ];

    protected function casts(): array
    {
        return [
            'subtotal' => 'decimal:2',
            'shipping_cost' => 'decimal:2',
            'commission' => 'decimal:2',
            'vendor_earning' => 'decimal:2',
            'shipped_at' => 'datetime',
            'delivered_at' => 'datetime',
        ];
    }

    public function order() {
        return $this->belongsTo(Order::class);
    }

    public function orderItems() {
        return $this->hasMany(OrderItem::class);
    }

    public function vendor() {
        return $this->belongsTo(VendorProfile::class);
    }
}
