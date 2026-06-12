<?php

namespace App\Repositories;

use App\Models\Category;

class CategoryRepository
{
    public function createCategory(array $data): Category {
        return Category::create($data);
    }
}
