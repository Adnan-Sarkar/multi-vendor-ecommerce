<?php

namespace App\Http\Requests\Api\V1\Address;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateAddressRequest extends FormRequest
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
            'name' => 'sometimes|required|string|min:3',
            'phone' => 'sometimes|required|string|min:11',
            'address_line_1' => 'sometimes|required|string|min:5',
            'address_line_2' => 'sometimes|nullable|string|min:5',
            'city' => 'sometimes|required|string|min:3',
            'state' => 'sometimes|required|string|min:3',
            'zip_code' => 'sometimes|nullable|string|min:3',
            'is_default' => 'sometimes|boolean',
            'type' => 'sometimes|in:shipping,billing',
        ];
    }
}
