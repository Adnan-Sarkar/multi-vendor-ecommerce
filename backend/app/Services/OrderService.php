<?php

namespace App\Services;

use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderVendor;
use App\Models\Review;
use App\Notifications\OrderCancelledNotification;
use App\Notifications\OrderPlacedNotification;
use App\Repositories\CartRepository;
use App\Repositories\OrderRepository;
use \App\Exceptions\BaseException;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Throwable;

class OrderService
{
    protected OrderRepository $orderRepository;
    protected CartRepository $cartRepository;
    protected CouponService $couponService;

    /**
     * @param OrderRepository $orderRepository
     * @param CartRepository $cartRepository
     * @param CouponService $couponService
     */
    public function __construct(OrderRepository $orderRepository, CartRepository $cartRepository, CouponService $couponService)
    {
        $this->orderRepository = $orderRepository;
        $this->cartRepository = $cartRepository;
        $this->couponService = $couponService;
    }

    /**
     * @throws BaseException
     * @throws Throwable
     */
    public function checkout(array $data): Order {
        $order = DB::transaction(function () use ($data) {
            // Get user's cart items
            $userId = auth()->user()->id;
            $cart = $this->cartRepository->getCart($userId);

            if (!$cart || $cart->cartItems->isEmpty()) {
                throw new BaseException('Cart is empty', 400);
            }

            // Calculate subtotal
            $subtotal = $cart->cartItems
                ->sum(fn ($item) => $item->unit_price * $item->quantity);

            // Resolve coupon (vendor-scoped, validated against the cart)
            $coupon = null;
            $couponDiscount = 0;

            if (!empty($data['coupon_code'])) {
                $couponResult = $this->couponService->applyCoupon($data['coupon_code']);
                $coupon = $couponResult['coupon'];
                $couponDiscount = $couponResult['discount'];
            }

            // Generate order number
            $orderNumber = 'ORD-' . strtoupper(Str::random(10));

            // Create order
            $order = $this->orderRepository->createOrder([
                'user_id' => $userId,
                'order_number' => $orderNumber,
                'shipping_address_id' => $data['shipping_address_id'],
                'billing_address_id' => $data['billing_address_id'] ?? null,
                'coupon_id' => $coupon?->id,
                'coupon_discount' => $couponDiscount,
                'payment_method' => $data['payment_method'],
                'subtotal' => $subtotal,
                'grand_total' => $subtotal - $couponDiscount,
                'notes' => $data['notes'] ?? null,
            ]);

            $vendorGroups = $cart->cartItems
                ->groupBy(fn(CartItem $item) => $item->product->vendor_id);

            // Create order vendors and items together
            foreach ($vendorGroups as $vendorId => $items) {
                $vendorItemsTotal = $items->sum(fn($item) => $item->unit_price * $item->quantity);

                // A coupon only discounts its own vendor's earning
                $vendorDiscount = ($coupon && (int) $vendorId === (int) $coupon->vendor_id)
                    ? $couponDiscount
                    : 0;

                // Create order vendor
                $orderVendor = $order->orderVendors()->create([
                    'vendor_id' => $vendorId,
                    'subtotal' => $vendorItemsTotal,
                    'commission' => 0,
                    'vendor_earning' => max($vendorItemsTotal - $vendorDiscount, 0),
                ]);

                // Create order items for this vendor
                $orderItems = $items->map(fn($item) => [
                    'order_vendor_id' => $orderVendor->id,
                    'product_id' => $item->product_id,
                    'variant_id' => $item->variant_id,
                    'product_name' => $item->product->name,
                    'product_sku' => $item->product->sku,
                    'quantity' => $item->quantity,
                    'unit_price' => $item->unit_price,
                    'total' => $item->unit_price * $item->quantity,
                ])->toArray();

                $order->orderItems()->createMany($orderItems);
            }

            foreach ($cart->cartItems as $item) {
                if ($item->product->manage_stock) {
                    $item->product->decrement('stock_qty', $item->quantity);

                    if ($item->product->fresh()->stock_qty <= 0) {
                        $item->product->update(['in_stock' => false]);
                    }
                }
            }

            // Record coupon usage once the order is committed
            if ($coupon) {
                $coupon->couponUsages()->create([
                    'user_id' => $userId,
                    'order_id' => $order->id,
                    'discount_amount' => $couponDiscount,
                ]);

                $coupon->increment('used_count');
            }

            // Clear the cart
            $this->cartRepository->clearCart($cart);

            return $order->load([
                'orderVendors.vendor',
                'orderItems',
                'shippingAddress',
                'billingAddress'
            ]);
        });

        auth()->user()->notify(new OrderPlacedNotification($order));

        return $order;
    }

    public function getOrders(): LengthAwarePaginator
    {
        $userId = auth()->user()->id;

        return $this->orderRepository->getOrders($userId);
    }

    public function getOrderDetails(Order $order): Order {
        $order = $this->orderRepository->getOrderDetails($order);

        $reviewedProductIds = Review::where('order_id', $order->id)
            ->where('user_id', $order->user_id)
            ->pluck('product_id')
            ->all();

        $order->orderItems->each(function ($orderItem) use ($reviewedProductIds) {
            $orderItem->is_reviewed = in_array($orderItem->product_id, $reviewedProductIds);
        });

        return $order;
    }

    /**
     * @throws BaseException
     */
    public function cancelOrder(Order $order, string $reason): Order
    {
        if (!in_array($order->status, ['pending', 'confirmed'])) {
            throw new BaseException('Order cannot be cancelled at this stage', 400);
        }

        $this->orderRepository->cancelOrder($order, $reason);

        $order->user->notify(new OrderCancelledNotification($order));

        return $order->refresh()
            ->load(['orderVendors', 'shippingAddress', 'orderItems']);
    }

    public function getVendorOrders(): LengthAwarePaginator {
        $vendorId = auth()->user()->vendorProfile->id;

        return $this->orderRepository->getVendorOrders($vendorId);
    }

    /**
     * @throws BaseException
     */
    public function updateVendorOrder(OrderVendor $orderVendor, string $status): OrderVendor {
        $this->authorizeVendorOrder($orderVendor);

        $updatedOrderVendor = $this->orderRepository->updateVendorOrder($orderVendor, $status);

        $this->syncOrderStatus($updatedOrderVendor->order);

        return $updatedOrderVendor;
    }

    private function syncOrderStatus(Order $order): void {
        $order->loadMissing('orderVendors');
        $vendorStatuses = $order->orderVendors->pluck('status');

        if ($vendorStatuses->isEmpty()) {
            return;
        }

        if ($vendorStatuses->every(fn ($vendorStatus) => $vendorStatus === 'delivered')) {
            $newStatus = 'delivered';
        } elseif ($vendorStatuses->every(fn ($vendorStatus) => $vendorStatus === 'cancelled')) {
            $newStatus = 'cancelled';
        } elseif ($vendorStatuses->contains('shipped')) {
            $newStatus = 'shipped';
        } elseif ($vendorStatuses->contains(fn ($vendorStatus) => in_array($vendorStatus, ['processing', 'delivered']))) {
            $newStatus = 'processing';
        } else {
            $newStatus = 'confirmed';
        }

        if ($order->status !== $newStatus) {
            $order->update(['status' => $newStatus]);
        }
    }

    /**
     * @throws BaseException
     */
    public function updateTrackingNumber(OrderVendor $orderVendor, string $trackingNumber): OrderVendor {
        $this->authorizeVendorOrder($orderVendor);

        return $this->orderRepository->updateTrackingNumber($orderVendor, $trackingNumber);
    }

    /**
     * @throws BaseException
     */
    private function authorizeVendorOrder(OrderVendor $orderVendor): void {
        $vendorId = auth()->user()->vendorProfile->id;

        if ((int) $orderVendor->vendor_id !== (int) $vendorId) {
            throw new BaseException('Order not found', 404);
        }
    }

    public function getAllOrders(): LengthAwarePaginator {
        return $this->orderRepository->getAllOrders();
    }
}
