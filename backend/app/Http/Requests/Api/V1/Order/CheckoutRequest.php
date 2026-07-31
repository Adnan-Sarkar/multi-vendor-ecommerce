<?php

namespace App\Http\Requests\Api\V1\Order;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
        $belongsToUser = Rule::exists('addresses', 'id')->where('user_id', auth()->id());

        return [
            'shipping_address_id' => ['required', 'integer', $belongsToUser],
            'billing_address_id' => ['sometimes', 'nullable', 'integer', $belongsToUser],
            'payment_method' => 'required|string|in:sslcommerz,bkash,card,cod',
            'notes' => 'sometimes|string',
            'coupon_code' => 'sometimes|nullable|string',
        ];
    }
}
