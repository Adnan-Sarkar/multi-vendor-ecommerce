<?php

namespace App\Repositories;

use App\Models\Order;

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
}
