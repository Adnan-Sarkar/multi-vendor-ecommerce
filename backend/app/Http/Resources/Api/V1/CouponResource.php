<?php

namespace App\Http\Resources\Api\V1;

use App\Models\Coupon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Coupon
 */
class CouponResource extends JsonResource
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
            'code' => $this->code,
            'type' => $this->type,
            'value' => $this->value,
            'min_order_amount' => $this->min_order_amount,
            'max_discount_amount' => $this->whenNotNull($this->max_discount_amount),
            'max_uses' => $this->whenNotNull($this->max_uses),
            'used_count' => $this->used_count,
            'max_uses_per_user' => $this->max_uses_per_user,
            'is_active' => $this->is_active,
            'starts_at' => $this->whenNotNull($this->starts_at),
            'expires_at' => $this->whenNotNull($this->expires_at),
            'created_at' => $this->created_at,
            'vendor' => $this->whenLoaded('vendor', fn () => [
                'id' => $this->vendor->id,
                'shop_name' => $this->vendor->shop_name,
                'slug' => $this->vendor->slug,
                'status' => $this->vendor->status,
            ]),
        ];
    }
}
