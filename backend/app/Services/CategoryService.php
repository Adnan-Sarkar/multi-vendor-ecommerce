<?php

namespace App\Services;

use App\Exceptions\CategoryException;
use App\Models\Category;
use App\Repositories\CategoryRepository;
use Illuminate\Support\Str;

class CategoryService
{
    protected CategoryRepository $categoryRepository;

    /**
     * @param CategoryRepository $categoryRepository
     */
    public function __construct(CategoryRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    public function createCategory(array $data): Category {
        $data['slug'] = Str::slug($data['name']);
        return $this->categoryRepository->createCategory($data);
    }

    public function updateCategory(Category $category, array $data): Category {
        if ($data['name']) {
            $data['slug'] = Str::slug($data['name']);
        }
        return $this->categoryRepository->updateCategory($category, $data);
    }

    /**
     * @throws CategoryException
     */
    public function deleteCategory(Category $category): void
    {
        $deleted = $this->categoryRepository->deleteCategory($category);

        if (!$deleted) {
            throw new CategoryException('Failed to delete category', 500);
        }
    }
}
