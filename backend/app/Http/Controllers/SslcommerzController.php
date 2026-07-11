<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class SslcommerzController extends Controller
{
    public function success(Request $request): RedirectResponse {
        $order = Order::where('order_number', $request->tran_id)->first();

        if ($order) {
            $order->update([
                'payment_status' => 'paid',
                'status' => 'confirmed',
            ]);

            Payment::create([
                'order_id' => $order->id,
                'payment_method' => 'sslcommerz',
                'transaction_id' => $request->bank_tran_id,
                'gateway_response' => $request->all(),
                'amount' => $request->amount,
                'currency' => $request->currency,
                'status' => 'paid',
                'paid_at' => now(),
            ]);
        }

        return redirect(config('app.frontend_url') . '/payment/success');
    }

    public function failure(Request $request): RedirectResponse {
        $order = Order::where('order_number', $request->tran_id)->first();

        if ($order) {
            $order->update(['payment_status' => 'failed']);
        }

        return redirect(config('app.frontend_url') . '/payment/failure');
    }

    public function cancel(Request $request): RedirectResponse {
        $order = Order::where('order_number', $request->tran_id)->first();

        if ($order) {
            $order->update(['payment_status' => 'failed']);
        }

        return redirect(config('app.frontend_url') . '/payment/cancel');
    }

    public function ipn(Request $request): void {
        // Handle IPN notification from SSLCommerz
        $order = Order::where('order_number', $request->tran_id)->first();

        if ($order) {
            $order->update(['payment_status' => $request->status === 'VALID' ? 'paid' : 'failed']);
        }
    }
}
