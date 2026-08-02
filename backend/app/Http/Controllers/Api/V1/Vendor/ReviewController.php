<?php

namespace App\Http\Controllers\Api\V1\Vendor;

use App\Exceptions\BaseException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Vendor\ReplyReviewRequest;
use App\Http\Resources\Api\V1\ReviewResource;
use App\Models\Product;
use App\Models\Review;
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
    public function productReviews(Product $product): JsonResponse {
        $result = $this->reviewService->getVendorProductReviews($product);

        return $this->paginated(
            ReviewResource::collection($result),
            'Product reviews retrieved successfully'
        );
    }

    /**
     * @throws BaseException
     */
    public function reply(ReplyReviewRequest $request, Review $review): JsonResponse {
        $result = $this->reviewService->replyToReview(
            $review,
            $request->validated()['reply']
        );

        return $this->success(
            new ReviewResource($result),
            'Reply added successfully'
        );
    }
}
