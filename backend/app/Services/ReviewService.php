<?php

namespace App\Services;

use App\Exceptions\BaseException;
use App\Models\Order;
use App\Models\OrderVendor;
use App\Models\Product;
use App\Models\Review;
use App\Repositories\OrderRepository;
use App\Repositories\ReviewRepository;
use Illuminate\Pagination\LengthAwarePaginator;
use \Symfony\Component\HttpFoundation\Response;

class ReviewService
{
    protected ReviewRepository $reviewRepository;
    protected OrderRepository $orderRepository;

    /**
     * @param ReviewRepository $reviewRepository
     * @param OrderRepository $orderRepository
     */
    public function __construct(ReviewRepository $reviewRepository, OrderRepository $orderRepository)
    {
        $this->reviewRepository = $reviewRepository;
        $this->orderRepository = $orderRepository;
    }


    /**
     * @throws BaseException
     */
    public function createReview(array $data): Review {
        $userId = auth()->user()->id;

        $order = $this->orderRepository->findUserOrder($userId, $data['order_id']);

        if (!$order) {
            throw new BaseException('You can only review products from your own orders', Response::HTTP_FORBIDDEN);
        }

        $orderItem = $order->orderItems->firstWhere('product_id', $data['product_id']);

        if (!$orderItem) {
            throw new BaseException('This product was not part of the specified order', Response::HTTP_BAD_REQUEST);
        }

        $orderVendor = OrderVendor::find($orderItem->order_vendor_id);

        if (!$orderVendor || $orderVendor->status !== 'delivered') {
            throw new BaseException('You can only review products after delivery', Response::HTTP_BAD_REQUEST);
        }

        if ($this->reviewRepository->userHasReviewed($userId, $data['product_id'], $data['order_id'])) {
            throw new BaseException('You have already reviewed this product for this order', Response::HTTP_CONFLICT);
        }

        $data['user_id'] = $userId;

        return $this->reviewRepository->createReview($data);
    }

    public function getProductReviews(int $productId): LengthAwarePaginator {
        return $this->reviewRepository->getProductReviews($productId);
    }

    public function getAdminReviews(array $filters = []): LengthAwarePaginator {
        return $this->reviewRepository->getAdminReviews($filters);
    }

    public function approveReview(Review $review): void {
        $this->reviewRepository->approveReview($review);
    }

    /**
     * @throws BaseException
     */
    public function getVendorProductReviews(Product $product): LengthAwarePaginator {
        $this->authorizeVendorProduct($product);

        return $this->reviewRepository->getVendorProductReviews($product->id);
    }

    /**
     * @throws BaseException
     */
    public function replyToReview(Review $review, string $reply): Review {
        $review->loadMissing('product');

        $this->authorizeVendorProduct($review->product);

        if ($review->vendor_reply !== null) {
            throw new BaseException('You have already replied to this review', Response::HTTP_CONFLICT);
        }

        return $this->reviewRepository->addVendorReply($review, $reply);
    }

    /**
     * @throws BaseException
     */
    private function authorizeVendorProduct(Product $product): void {
        $vendorId = auth()->user()->vendorProfile->id;

        if ((int) $product->vendor_id !== (int) $vendorId) {
            throw new BaseException('Product not found', Response::HTTP_NOT_FOUND);
        }
    }
}
