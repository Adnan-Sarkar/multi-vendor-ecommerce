<?php

namespace App\Http\Controllers\Api\V1;

use App\Exceptions\CategoryException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Category\StoreCategoryRequest;
use App\Http\Requests\Api\V1\Category\UpdateCategoryRequest;
use App\Http\Resources\Api\V1\CategoryResource;
use App\Models\Category;
use App\Services\CategoryService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    use ApiResponse;

    protected CategoryService $categoryService;

    /**
     * @param CategoryService $categoryService
     */
    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }


    public function store(StoreCategoryRequest $request): JsonResponse {
        $category = $this->categoryService->createCategory($request->validated());

        return $this->success(
            new CategoryResource($category),
            'Category created successfully',
            201);
    }

    public function index(): JsonResponse {
        $result = $this->categoryService->getAllCategories();

        return $this->paginated(
            CategoryResource::collection($result),
            'Categories retrieved successfully'
        );
    }

    public function show(Category $category): JsonResponse {
        $result = $this->categoryService->getCategoryDetails($category);

        return $this->success(
            new CategoryResource($result),
            'Category details retrieved successfully');
    }

    public function update(UpdateCategoryRequest $request, Category $category): JsonResponse {
        $category = $this->categoryService->updateCategory($category, $request->validated());

        return $this->success(
            new CategoryResource($category),
            'Category updated successfully',
            200);
    }

    /**
     * @throws CategoryException
     */
    public function destroy(Category $category): JsonResponse {
        $this->categoryService->deleteCategory($category);

        return $this->success(
            null,
            'Category deleted successfully',
            200);
    }
}
