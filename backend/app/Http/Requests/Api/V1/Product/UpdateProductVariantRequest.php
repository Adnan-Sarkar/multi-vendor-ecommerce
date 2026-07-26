<?php

namespace App\Http\Requests\Api\V1\Product;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProductVariantRequest extends FormRequest
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
            'price' => 'sometimes|required|numeric',
            'stock_qty' => 'sometimes|required|integer',
            'in_stock' => 'sometimes|boolean',
            'image' => 'sometimes|nullable|string|url',
            'attributes' => 'sometimes|required|array|min:1',
            'attributes.*' => 'required|integer|exists:product_attribute_values,id',
        ];
    }
}
