<?php

namespace App\Http\Resources\Api\V1;

use App\Models\OrderVendor;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;


/**
 * @mixin OrderVendor
 */
class OrderVendorResource extends JsonResource
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
            'vendor' => new VendorProfileResource($this->whenLoaded('vendor')),
            'order' => $this->whenLoaded('order', fn() => [
                'id' => $this->order->id,
                'order_number' => $this->order->order_number,
                'status' => $this->order->status,
                'payment_method' => $this->order->payment_method,
                'payment_status' => $this->order->payment_status,
                'shipping_address' => new AddressResource($this->order->shippingAddress),
                'created_at' => $this->order->created_at,
            ]),
            'order_items' => OrderItemResource::collection($this->whenLoaded('orderItems')),
            'subtotal' => $this->subtotal,
            'shipping_cost' => $this->shipping_cost,
            'commission' => $this->commission,
            'vendor_earning' => $this->vendor_earning,
            'status' => $this->status,
            'tracking_number' => $this->whenNotNull($this->tracking_number),
            'shipped_at' => $this->whenNotNull($this->shipped_at),
            'delivered_at' => $this->whenNotNull($this->delivered_at),
        ];
    }
}
