<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductImage extends Model
{
    protected $attributes = [
        'is_primary' => false,
        'sort_order' => 0,
    ];

    protected $fillable = [
        'image_url',
        'is_primary',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'is_primary' => 'boolean'
        ];
    }

    public function product() {
        return $this->belongsTo(Product::class);
    }
}
