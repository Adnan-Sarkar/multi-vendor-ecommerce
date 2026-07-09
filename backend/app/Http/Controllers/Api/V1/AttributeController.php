<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Attribute\StoreAttributeRequest;
use App\Http\Requests\Api\V1\Attribute\StoreAttributeValueRequest;
use App\Http\Resources\Api\V1\ProductAttributeResource;
use App\Http\Resources\Api\V1\ProductAttributeValueResource;
use App\Models\ProductAttribute;
use App\Models\ProductAttributeValue;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;

class AttributeController extends Controller
{
    use ApiResponse;

    public function index(): JsonResponse {
        $attributes = ProductAttribute::with('values')->get();

        return $this->success(
            ProductAttributeResource::collection($attributes),
            'Attributes retrieved successfully'
        );
    }

    public function store(StoreAttributeRequest $request): JsonResponse {
        $attribute = ProductAttribute::create([
            'name' => $request->name,
        ]);

        return $this->success(
            new ProductAttributeResource($attribute->load('values')),
            'Attribute created successfully',
            201
        );
    }

    public function storeValue(StoreAttributeValueRequest $request, ProductAttribute $attribute): JsonResponse {
        $value = $attribute->values()->create([
            'value' => $request->value,
        ]);

        return $this->success(
            new ProductAttributeValueResource($value),
            'Attribute value created successfully',
            201
        );
    }

    public function destroy(ProductAttribute $attribute): JsonResponse {
        $attribute->delete();

        return $this->success(null,
            'Attribute deleted successfully');
    }

    public function destroyValue(ProductAttributeValue $value): JsonResponse {
        $value->delete();

        return $this->success(null,
            'Attribute value deleted successfully');
    }
}
