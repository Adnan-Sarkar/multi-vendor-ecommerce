<?php

namespace App\Http\Resources\Api\V1;

use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin CartItem
 */
class CartItemResource extends JsonResource
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
            'product' => [
                'id' => $this->product->id,
                'name' => $this->product->name,
                'thumbnail' => $this->product->thumbnail,
                'regular_price' => $this->product->regular_price,
                'sale_price' => $this->product->sale_price,
                'primary_image' => $this->product->images->where('is_primary', true)->first()?->image_url,
            ],
            'variant' => new ProductVariantResource($this->whenLoaded('variant')),
            'quantity' => $this->quantity,
            'unit_price' => $this->unit_price,
            'subtotal' => $this->unit_price * $this->quantity,
            'available_stock' => $this->variant
                ? $this->variant->stock_qty
                : ($this->product->manage_stock ? $this->product->stock_qty : null),
        ];
    }
}
