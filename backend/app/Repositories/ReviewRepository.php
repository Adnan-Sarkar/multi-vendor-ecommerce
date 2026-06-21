<?php

namespace App\Repositories;

use App\Models\Review;

class ReviewRepository
{
    public function createReview(array $data): Review {
        $review = Review::create($data);
        return $review->load(['product', 'user']);
    }
}
