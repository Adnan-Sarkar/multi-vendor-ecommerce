<?php

namespace App\Http\Requests\Api\V1\Coupon;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreCouponRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'type' => 'required|string|in:flat,percentage',
            'code' => 'required|string|unique:coupons,code',
            'value' => 'required|numeric|min:0',
            'min_order_amount' => 'sometimes|numeric|min:0',
            'max_discount_amount' => 'sometimes|nullable|numeric|min:0',
            'max_uses' => 'sometimes|nullable|integer|min:1',
            'max_uses_per_user' => 'sometimes|integer',
            'is_active' => 'sometimes|boolean',
            'starts_at' => 'sometimes|nullable|date',
            'expires_at' => 'sometimes|nullable|date|after:starts_at',
        ];
    }
}
