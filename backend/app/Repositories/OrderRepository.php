<?php

namespace App\Repositories;

use App\Models\Order;
use Illuminate\Pagination\LengthAwarePaginator;

class OrderRepository
{
    public function createOrder(array $data): Order {
        return Order::create($data);
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
}
