<?php

namespace App\Services;

use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderVendor;
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

    /**
     * @param OrderRepository $orderRepository
     * @param CartRepository $cartRepository
     */
    public function __construct(OrderRepository $orderRepository, CartRepository $cartRepository)
    {
        $this->orderRepository = $orderRepository;
        $this->cartRepository = $cartRepository;
    }

    /**
     * @throws BaseException
     * @throws Throwable
     */
    public function checkout(array $data): Order {
        return DB::transaction(function () use ($data) {
            // Get user's cart items
            $userId = auth()->user()->id;
            $cart = $this->cartRepository->getCart($userId);

            if (!$cart || $cart->cartItems->isEmpty()) {
                throw new BaseException('Cart is empty', 400);
            }

            // Calculate subtotal
            $subtotal = $cart->cartItems
                ->sum(fn ($item) => $item->unit_price * $item->quantity);

            // Generate order number
            $orderNumber = 'ORD-' . strtoupper(Str::random(10));

            // Create order
            $order = $this->orderRepository->createOrder([
                'user_id' => $userId,
                'order_number' => $orderNumber,
                'shipping_address_id' => $data['shipping_address_id'],
                'billing_address_id' => $data['billing_address_id'] ?? null,
                'payment_method' => $data['payment_method'],
                'subtotal' => $subtotal,
                'grand_total' => $subtotal,
                'notes' => $data['notes'] ?? null,
            ]);

            $vendorGroups = $cart->cartItems
                ->groupBy(fn(CartItem $item) => $item->product->vendor_id);

            // Create order vendors and items together
            foreach ($vendorGroups as $vendorId => $items) {
                // Create order vendor
                $orderVendor = $order->orderVendors()->create([
                    'vendor_id' => $vendorId,
                    'subtotal' => $items->sum(fn($item) => $item->unit_price * $item->quantity),
                    'commission' => 0,
                    'vendor_earning' => $items->sum(fn($item) => $item->unit_price * $item->quantity),
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

            // Clear the cart
            $this->cartRepository->clearCart($cart);

            return $order->load([
                'orderVendors.vendor',
                'orderItems',
                'shippingAddress',
                'billingAddress'
            ]);
        });
    }

    public function getOrders(): LengthAwarePaginator
    {
        $userId = auth()->user()->id;

        return $this->orderRepository->getOrders($userId);
    }

    public function getOrderDetails(Order $order): Order {
        return $this->orderRepository->getOrderDetails($order);
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

        return $order->refresh()
            ->load(['orderVendors', 'shippingAddress', 'orderItems']);
    }

    public function getVendorOrders(): LengthAwarePaginator {
        $vendorId = auth()->user()->vendorProfile->id;

        return $this->orderRepository->getVendorOrders($vendorId);
    }

    public function updateVendorOrder(OrderVendor $orderVendor, string $status): OrderVendor {
        return $this->orderRepository->updateVendorOrder($orderVendor, $status);
    }

    public function updateTrackingNumber(OrderVendor $orderVendor, string $trackingNumber): OrderVendor {
        return $this->orderRepository->updateTrackingNumber($orderVendor, $trackingNumber);
    }

    public function getAllOrders(): LengthAwarePaginator {
        return $this->orderRepository->getAllOrders();
    }
}
