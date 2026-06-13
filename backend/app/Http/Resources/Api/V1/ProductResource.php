<?php

namespace App\Http\Resources\Api\V1;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Product
 */
class ProductResource extends JsonResource
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

            // Basic Information
            'name' => $this->name,
            'slug' => $this->slug,
            'sku' => $this->sku,
            'short_description' => $this->short_description,
            'description' => $this->description,
            'thumbnail' => $this->thumbnail,

            // Pricing
            'regular_price' => $this->regular_price,
            'sale_price' => $this->sale_price,
            'sale_start_date' => $this->sale_start_date,
            'sale_end_date' => $this->sale_end_date,

            // Inventory
            'stock_qty' => $this->stock_qty,
            'low_stock_threshold' => $this->low_stock_threshold,
            'manage_stock' => $this->manage_stock,
            'in_stock' => $this->in_stock,

            // Shipping
            'weight' => $this->weight,
            'length' => $this->length,
            'width' => $this->width,
            'height' => $this->height,

            // Status
            'status' => $this->status,
            'is_featured' => $this->is_featured,
            'views' => $this->views,

            // Moderation
            'rejection_reason' => $this->whenNotNull($this->rejection_reason),

            // Counts (only included when loaded via withCount())
            'categories_count' => $this->whenCounted('categories'),
            'images_count' => $this->whenCounted('images'),
            'order_items_count' => $this->whenCounted('orderItems'),
            'reviews_count' => $this->whenCounted('reviews'),
            'tags_count' => $this->whenCounted('tags'),
            'variants_count' => $this->whenCounted('variants'),

            // Relationships (only included when eager loaded)
            'categories' => CategoryResource::collection(
                $this->whenLoaded('categories')
            ),

            'tags' => $this->whenLoaded('tags'),

            'vendor' => new VendorProfileResource($this->whenLoaded('vendor')),

            'images' => ProductImageResource::collection($this->whenLoaded('images')),

            // Timestamps
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'approved_at' => $this->whenNotNull($this->approved_at),
        ];
    }
}
