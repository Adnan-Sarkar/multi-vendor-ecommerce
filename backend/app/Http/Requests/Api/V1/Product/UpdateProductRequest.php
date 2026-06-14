<?php

namespace App\Http\Requests\Api\V1\Product;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
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
            'name' => 'sometimes|string|min:3',
            'short_description' => 'sometimes|string|min:5',
            'description' => 'sometimes|string|min:5',
            'thumbnail' => 'sometimes|string|url',
            'regular_price' => 'sometimes|numeric',
            'sale_price' => 'sometimes|numeric',
            'sale_start_date' => 'sometimes|date',
            'sale_end_date' => 'sometimes|date|after:sale_start_date',
            'stock_qty' => 'sometimes|integer',
            'low_stock_threshold' => 'sometimes|integer',
            'manage_stock' => 'sometimes|boolean',
            'in_stock' => 'sometimes|boolean',
            'weight' => 'sometimes|numeric|min:0',
            'length' => 'sometimes|numeric|min:0',
            'width' => 'sometimes|numeric|min:0',
            'height' => 'sometimes|numeric|min:0',
            'categories' => 'sometimes|array|min:1',
            'categories.*' => 'integer|exists:categories,id',
            'tags' => 'sometimes|array',
            'tags.*' => 'integer|exists:product_tags,id',
        ];
    }
}
