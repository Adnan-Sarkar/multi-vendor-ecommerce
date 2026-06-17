<?php

namespace App\Http\Requests\Api\V1\Order;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class CheckoutRequest extends FormRequest
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
            'shipping_address_id' => 'required|integer|exists:addresses,id',
            'billing_address_id' => 'sometimes|nullable|integer|exists:addresses,id',
            'payment_method' => 'required|string|in:sslcommerz,bkash,card,cod',
            'notes' => 'sometimes|string',
        ];
    }
}
