<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes, HasFactory;

    protected $attributes = [
        'status' => 'pending',
        'is_featured' => false,
        'views' => 0,
        'manage_stock' => true,
        'in_stock' => true,
        'weight' => 0,
    ];

    protected $fillable = [
        'vendor_id',
        'name',
        'slug',
        'sku',
        'short_description',
        'description',
        'thumbnail',
        'regular_price',
        'sale_price',
        'sale_start_date',
        'sale_end_date',
        'stock_qty',
        'low_stock_threshold',
        'manage_stock',
        'in_stock',
        'weight',
        'length',
        'width',
        'height',
        'status',
        'is_featured',
        'views',
        'rejection_reason',
        'approved_at',
    ];

    protected function casts(): array
    {
        return [
            'regular_price' => 'decimal:2',
            'sale_price' => 'decimal:2',
            'sale_start_date' => 'datetime',
            'sale_end_date' => 'datetime',
            'manage_stock' => 'boolean',
            'in_stock' => 'boolean',
            'weight' => 'decimal:2',
            'length' => 'decimal:2',
            'width' => 'decimal:2',
            'height' => 'decimal:2',
            'is_featured' => 'boolean',
            'approved_at' => 'datetime',
        ];
    }

    public function vendor() {
        return $this->belongsTo(VendorProfile::class, 'vendor_id');
    }

    public function categories() {
        return $this->belongsToMany(Category::class);
    }

    public function tags() {
        return $this->belongsToMany(Tag::class, 'product_tag');
    }

    public function images() {
        return $this->hasMany(ProductImage::class);
    }

    public function variants() {
        return $this->hasMany(ProductVariant::class);
    }

    public function reviews() {
        return $this->hasMany(Review::class);
    }

    public function orderItems() {
        return $this->hasMany(OrderItem::class);
    }
}
