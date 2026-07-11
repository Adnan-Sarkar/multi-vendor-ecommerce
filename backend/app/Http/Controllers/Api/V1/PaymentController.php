<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Raziul\Sslcommerz\Facades\Sslcommerz;

class PaymentController extends Controller
{
    use ApiResponse;

    public function initiatePayment(Order $order): JsonResponse {
        $user = auth()->user();

        $order->load('orderItems');

        $response = Sslcommerz::setOrder(
            $order->grand_total,
            $order->order_number,
            'Order: ' . $order->order_number
        )
            ->setCustomer(
                $user->name,
                $user->email,
                $user->phone
            )
            ->setShippingInfo(
                $order->orderItems->count(),
                $user->addresses()->where('is_default', true)->first()?->address_line_1 ?? 'Dhaka'
            )
            ->makePayment();

        if ($response->success()) {
            return $this->success(
                [
                'payment_url' => $response->gatewayPageURL()
                ],
                'Payment initiated successfully'
            );
        }

        return $this->error('Payment initiation failed', 400);
    }
}
