<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\ReviewResource;
use App\Models\Review;
use App\Services\ReviewService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

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

    public function index(Request $request): JsonResponse {
        $result = $this->reviewService->getAdminReviews([
            'status' => $request->query('status'),
        ]);

        return $this->paginated(
            ReviewResource::collection($result),
            'Reviews retrieved successfully'
        );
    }

    public function approveReview(Review $review): JsonResponse {
        $this->reviewService->approveReview($review);

        return $this->success(null, 'Review Approved successfully');
    }
}
