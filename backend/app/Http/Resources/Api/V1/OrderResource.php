<?php

namespace App\Http\Resources\Api\V1;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;


/**
 * @mixin Order
 */
class OrderResource extends JsonResource
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
            'order_number' => $this->order_number,
            'status' => $this->status,
            'payment_method' => $this->payment_method,
            'payment_status' => $this->payment_status,
            'customer' => new UserResource($this->whenLoaded('user')),

            // Amounts
            'subtotal' => $this->subtotal,
            'shipping_cost' => $this->shipping_cost,
            'coupon_discount' => $this->coupon_discount,
            'grand_total' => $this->grand_total,

            // Addresses
            'shipping_address' => new AddressResource($this->whenLoaded('shippingAddress')),
            'billing_address' => new AddressResource($this->whenLoaded('billingAddress')),

            // Order details
            'order_vendors' => OrderVendorResource::collection($this->whenLoaded('orderVendors')),
            'order_items' => OrderItemResource::collection($this->whenLoaded('orderItems')),

            // Notes
            'notes' => $this->whenNotNull($this->notes),
            'cancelled_at' => $this->whenNotNull($this->cancelled_at),
            'cancellation_reason' => $this->whenNotNull($this->cancellation_reason),

            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
