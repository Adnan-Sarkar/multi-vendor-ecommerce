<?php

namespace App\Http\Resources\Api\V1;

use App\Models\VendorProfile;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin VendorProfile
 */
class PublicVendorResource extends JsonResource
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
            'shop_name' => $this->shop_name,
            'slug' => $this->slug,
            'description' => $this->whenNotNull($this->description),
            'logo' => $this->whenNotNull($this->logo),
            'banner' => $this->whenNotNull($this->banner),
            'city' => $this->whenNotNull($this->city),
            'state' => $this->whenNotNull($this->state),
            'member_since' => $this->created_at,
            'products_count' => $this->whenNotNull($this->products_count),
            'review_count' => $this->whenNotNull($this->reviews_count),
            'average_rating' => $this->when(
                isset($this->reviews_avg_rating),
                fn () => round((float) $this->reviews_avg_rating, 1)
            ),
            'stats' => $this->when(!is_null($this->stats), $this->stats),
        ];
    }
}
