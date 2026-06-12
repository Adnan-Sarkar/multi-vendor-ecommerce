<?php

namespace App\Http\Requests\Api\V1\Category;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreCategoryRequest extends FormRequest
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
            'parent_id' => 'sometimes|nullable|integer|exists:categories,id',
            'name' => 'required|string|min:3',
            'description' => 'required|string|min:5',
            'image' => 'sometimes|string|url',
            'is_active' => 'sometimes|boolean',
        ];
    }
}
