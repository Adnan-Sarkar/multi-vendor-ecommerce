<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'shipping_address_id',
        'billing_address_id',
        'order_number',
        'coupon_discount',
        'subtotal',
        'grand_total',
        'shipping_cost',
        'tax',
        'payment_method',
        'payment_status',
        'status',
        'notes',
        'cancelled_at',
        'cancellation_reason',
    ];

    protected function casts(): array
    {
        return [
            'coupon_discount' => 'decimal:2',
            'subtotal' => 'decimal:2',
            'grand_total' => 'decimal:2',
            'shipping_cost' => 'decimal:2',
            'tax' => 'decimal:2',
            'cancelled_at' => 'datetime',
        ];
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function shippingAddress() {
        return $this->belongsTo(Address::class, 'shipping_address_id');
    }

    public function billingAddress() {
        return $this->belongsTo(Address::class, 'billing_address_id');
    }

    public function orderItems() {
        return $this->hasMany(OrderItem::class);
    }

    public function orderVendors() {
        return $this->hasMany(OrderVendor::class);
    }

    public function payment() {
        return $this->hasOne(Payment::class);
    }

    public function coupon() {
        return $this->belongsTo(Coupon::class);
    }
}
