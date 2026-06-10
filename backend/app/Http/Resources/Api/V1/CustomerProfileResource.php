<?php

namespace App\Http\Resources\Api\V1;

use App\Models\CustomerProfile;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin CustomerProfile
 */
class CustomerProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'date_of_birth' => $this->date_of_birth,
            'gender' => $this->gender,
        ];
    }
}
