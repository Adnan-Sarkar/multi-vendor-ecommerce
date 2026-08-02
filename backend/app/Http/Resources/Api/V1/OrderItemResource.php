<?php

namespace App\Http\Resources\Api\V1;

use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;


/**
 * @mixin OrderItem
 */
class OrderItemResource extends JsonResource
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
            'product_id' => $this->product_id,
            'product_name' => $this->product_name,
            'product_sku' => $this->product_sku,
            'variant_details' => $this->whenNotNull($this->variant_details),
            'quantity' => $this->quantity,
            'unit_price' => $this->unit_price,
            'total' => $this->total,
            'fulfillment_status' => $this->whenLoaded('orderVendor', fn () => $this->orderVendor->status),
            'is_reviewed' => (bool) ($this->is_reviewed ?? false),
            'product' => new ProductResource($this->whenLoaded('product')),
            'variant' => new ProductVariantResource($this->whenLoaded('variant')),
        ];
    }
}
