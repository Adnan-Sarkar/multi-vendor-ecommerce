<?php

namespace App\Http\Resources\Api\V1;

use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin ProductVariant
 */
class ProductVariantResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'sku' => $this->sku,
            'price' => $this->price,
            'stock_qty' => $this->stock_qty,
            'in_stock' => $this->in_stock,
            'image' => $this->image,
            'attribute_values' => ProductAttributeValueResource::collection($this->whenLoaded('attributeValues')),
            'attribute_values_count' => $this->whenCounted('attributeValues'),
        ];
    }
}
