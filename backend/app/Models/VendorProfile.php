<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VendorProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'shop_name',
        'slug',
        'description',
        'logo',
        'banner',
        'address',
        'city',
        'state',
        'zip_code',
        'status',
        'commission_rate',
        'total_withdrawn',
        'total_earnings',
        'balance',
        'rejection_reason',
        'approved_at'
    ];

    public function casts(): array
    {
        return [
            'commission_rate' => 'decimal:2',
            'total_withdrawn' => 'decimal:2',
            'total_earnings' => 'decimal:2',
            'balance' => 'decimal:2',
            'approved_at' => 'datetime',
        ];
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function products() {
        return $this->hasMany(Product::class);
    }

    public function orderVendors() {
        return $this->hasMany(OrderVendor::class);
    }

    public function withdrawals() {
        return $this->hasMany(Withdrawal::class);
    }

    public function vendorShippingRates () {
        return $this->hasMany(VendorShippingRate::class);
    }
}
