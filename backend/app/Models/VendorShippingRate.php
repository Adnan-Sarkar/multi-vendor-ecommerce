<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VendorShippingRate extends Model
{
    protected $fillable = [
        'vendor_id',
        'shipping_method_id',
        'rate',
        'free_shipping_above',
    ];

    protected function casts(): array
    {
        return [
            'rate' => 'decimal:2',
            'free_shipping_above' => 'decimal:2',
        ];
    }

    public function vendor() {
        return $this->belongsTo(VendorProfile::class);
    }

    public function shippingMethod() {
        return $this->belongsTo(ShippingMethod::class);
    }
}
