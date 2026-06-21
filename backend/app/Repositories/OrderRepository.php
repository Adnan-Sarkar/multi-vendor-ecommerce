<?php

namespace App\Repositories;

use App\Models\Order;
use App\Models\OrderVendor;
use Illuminate\Pagination\LengthAwarePaginator;

class OrderRepository
{
    public function createOrder(array $data): Order {
        return Order::create($data);
    }

    public function findUserOrder(int $userId, int $orderId): ?Order {
        return Order::where('user_id', $userId)
            ->where('id', $orderId)
            ->with('orderItems')
            ->first();
    }

    public function createOrderItems(Order $order, array $items): void {
        $order->orderItems()->createMany($items);
    }

    public function createOrderVendors(Order $order, array $vendors): void {
        $order->orderVendors()->createMany($vendors);
    }

    public function getOrders(int $userId): LengthAwarePaginator {
        return Order::where('user_id', $userId)
            ->with(['shippingAddress', 'orderItems', 'orderVendors.vendor'])
            ->latest()
            ->paginate(15);
    }

    public function getOrderDetails(Order $order): Order {
        return $order->load([
            'orderVendors.vendor',
            'shippingAddress',
            'billingAddress',
            'orderItems',
        ]);
    }

    public function cancelOrder(Order $order, string $reason): void
    {
        $order->update([
            'status' => 'cancelled',
            'cancellation_reason' => $reason,
            'cancelled_at' => now()
        ]);
    }

    public function getVendorOrders(int $vendorId): LengthAwarePaginator {
        return OrderVendor::where('vendor_id', $vendorId)
            ->with(['order.shippingAddress', 'orderItems', 'order'])
            ->latest()
            ->paginate(20);
    }

    public function updateVendorOrder(OrderVendor $orderVendor, string $status): OrderVendor {
        if ($status === 'shipped') {
            $orderVendor->update([
                'status' => $status,
                'shipped_at' => now()
            ]);
        } else if ($status === 'delivered') {
            $orderVendor->update([
                'status' => $status,
                'delivered_at' => now()
            ]);
        } else {
            $orderVendor->update([
                'status' => $status
            ]);
        }

        return $orderVendor->load([
            'order.shippingAddress',
            'orderItems',
            'order'
        ]);
    }

    public function updateTrackingNumber(OrderVendor $orderVendor, string $trackingNumber): OrderVendor {
        $orderVendor->update(['tracking_number' => $trackingNumber]);
        return $orderVendor->refresh();
    }

    public function getAllOrders(): LengthAwarePaginator {
        return Order::with(['user', 'shippingAddress', 'orderVendors.vendor', 'orderItems'])
            ->latest()
            ->paginate(20);
    }
}
