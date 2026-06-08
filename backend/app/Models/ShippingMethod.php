<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShippingMethod extends Model
{
    protected $fillable = [
        'name',
        'description',
        'cost',
        'min_delivery_days',
        'max_delivery_days',
    ];

    protected function casts(): array
    {
        return [
            'cost' => 'decimal:2'
        ];
    }

    public function vendorShippingRates() {
        return $this->hasMany(VendorShippingRate::class);
    }

    public function orders() {
        return $this->hasMany(Order::class);
    }
}
