<?php

namespace App\Repositories;

use App\Models\Category;
use \Illuminate\Pagination\LengthAwarePaginator;

class CategoryRepository
{
    public function createCategory(array $data): Category {
        return Category::create($data);
    }

    public function getAllCategories(): LengthAwarePaginator
    {
        return Category::whereNull('parent_id')
            ->with('children')
            ->paginate(20);
    }

    public function getCategoryDetails(Category $category): Category {
        return $category->load(['parent', 'children'])
            ->loadCount('products');
    }

    public function updateCategory(Category $category, array $data): Category {;
        $category->update($data);

        return $category->fresh();
    }

    public function deleteCategory(Category $category): bool {
        return $category->delete();
    }
}
