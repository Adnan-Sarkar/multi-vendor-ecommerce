<?php

namespace App\Http\Requests\Api\V1\Product;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
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
            'name' => 'required|string|min:3',
            'short_description' => 'required|string|min:10',
            'description' => 'nullable|string|min:10',
            'categories' => 'required|array|min:1',
            'categories.*' => 'integer|exists:categories,id',
            'tags' => 'sometimes|array',
            'tags.*' => 'integer|exists:product_tags,id',
            'thumbnail' => 'nullable|string|url',
            'regular_price' => 'required|numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0',
            'sale_start_date' => 'nullable|date',
            'sale_end_date' => 'nullable|date|after:sale_start_date',
            'stock_qty' => 'nullable|integer',
            'low_stock_threshold' => 'nullable|integer',
            'manage_stock' => 'sometimes|boolean',
            'in_stock' => 'sometimes|boolean',
            'weight' => 'sometimes|numeric|min:0',
            'length' => 'nullable|numeric|min:0',
            'width' => 'nullable|numeric|min:0',
            'height' => 'nullable|numeric|min:0',
        ];
    }
}
