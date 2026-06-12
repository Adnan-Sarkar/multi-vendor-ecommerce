<?php

namespace App\Services;

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
}
