<?php

namespace App\Http\Controllers\Api\V1;

use App\Exceptions\BaseException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Review\StoreReviewRequest;
use App\Http\Resources\Api\V1\ReviewResource;
use App\Services\ReviewService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;

class ReviewController extends Controller
{
    use ApiResponse;

    protected ReviewService $reviewService;

    /**
     * @param ReviewService $reviewService
     */
    public function __construct(ReviewService $reviewService)
    {
        $this->reviewService = $reviewService;
    }

    /**
     * @throws BaseException
     */
    public function store(StoreReviewRequest $request): JsonResponse {
        $result = $this->reviewService->createReview($request->validated());

        return $this->success(
            new ReviewResource($result),
            'Review created successfully',
            201);
    }
}
