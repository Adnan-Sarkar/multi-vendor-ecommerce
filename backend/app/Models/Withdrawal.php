<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Withdrawal extends Model
{
    protected $attributes = [
        'status' => 'pending',
        'method' => 'bank',
    ];

    protected $fillable = [
        'vendor_id',
        'amount',
        'account_details',
        'admin_note',
        'method',
        'status',
        'processed_at',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'account_details' => 'array',
            'processed_at' => 'datetime',
        ];
    }

    public function vendor() {
        return $this->belongsTo(VendorProfile::class);
    }
}
