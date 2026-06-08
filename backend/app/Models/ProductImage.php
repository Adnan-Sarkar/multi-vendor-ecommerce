<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductImage extends Model
{
    protected $fillable = [
        'image_url',
        'is_primary',
        'sort_order',
    ];

    protected function casts() {
        return [
            'is_primary' => 'boolean'
        ];
    }

    public function product() {
        return $this->belongsTo(Product::class);
    }
}
