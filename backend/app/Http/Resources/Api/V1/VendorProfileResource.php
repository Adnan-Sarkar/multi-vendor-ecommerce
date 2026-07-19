<?php

namespace App\Http\Resources\Api\V1;

use App\Models\VendorProfile;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin VendorProfile
 */
class VendorProfileResource extends JsonResource
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
            'address' => $this->whenNotNull($this->address),
            'city' => $this->whenNotNull($this->city),
            'state' => $this->whenNotNull($this->state),
            'zip_code' => $this->whenNotNull($this->zip_code),
            'status' => $this->whenNotNull($this->status),
            'user' => new UserResource($this->whenLoaded('user')),
        ];
    }
}
