<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductAttributeValue extends Model
{
    protected $fillable = [
        'attribute_id',
        'value'
    ];

    public function attribute() {
        return $this->belongsTo(ProductAttribute::class, 'attribute_id');
    }

    public function variants() {
        return $this->belongsToMany(ProductVariant::class, 'product_variant_attributes', 'attribute_value_id', 'variant_id');
    }
}
