<?php

namespace App\Services;

use App\Exceptions\BaseException;
use App\Models\Order;
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

        if ($order->status !== 'delivered') {
            throw new BaseException('You can only review products after delivery', Response::HTTP_BAD_REQUEST);
        }

        $orderHasProduct = $order->orderItems->contains('product_id', $data['product_id']);

        if (!$orderHasProduct) {
            throw new BaseException('This product was not part of the specified order', Response::HTTP_BAD_REQUEST);
        }

        $data['user_id'] = $userId;

        return $this->reviewRepository->createReview($data);
    }

    public function getProductReviews(int $productId): LengthAwarePaginator {
        return $this->reviewRepository->getProductReviews($productId);
    }
}
