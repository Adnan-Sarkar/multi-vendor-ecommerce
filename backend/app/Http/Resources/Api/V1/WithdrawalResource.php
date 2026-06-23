<?php

namespace App\Http\Resources\Api\V1;

use App\Models\Withdrawal;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Withdrawal
 */
class WithdrawalResource extends JsonResource
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
            'amount' => $this->amount,
            'method' => $this->method,
            'account_details' => $this->account_details,
            'status' => $this->status,
            'admin_note' => $this->whenNotNull($this->admin_note),
            'processed_at' => $this->whenNotNull($this->processed_at),
            'vendor' => new VendorProfileResource($this->whenLoaded('vendor')),
            'created_at' => $this->created_at,
        ];
    }
}
