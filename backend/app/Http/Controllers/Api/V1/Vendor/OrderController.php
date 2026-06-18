<?php

namespace App\Http\Controllers\Api\V1\Vendor;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Vendor\UpdateOrderStatusRequest;
use App\Http\Resources\Api\V1\OrderVendorResource;
use App\Models\OrderVendor;
use App\Services\OrderService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    use ApiResponse;

    protected OrderService $orderService;

    /**
     * @param OrderService $orderService
     */
    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    public function index(): JsonResponse {
        $result = $this->orderService->getVendorOrders();

        return $this->paginated(
            OrderVendorResource::collection($result),
            'Vendor orders retrieved successfully'
        );
    }

    public function update(UpdateOrderStatusRequest $request, OrderVendor $orderVendor): JsonResponse {
        $result = $this->orderService
            ->updateVendorOrder($orderVendor, $request->validated()['status']);

        return $this->success(
            new OrderVendorResource($result),
            'Order status updated successfully'
        );
    }
}
