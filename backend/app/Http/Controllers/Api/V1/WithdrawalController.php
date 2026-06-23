<?php

namespace App\Http\Controllers\Api\V1;

use App\Exceptions\BaseException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Withdrawal\StoreWithdrawalRequest;
use App\Http\Resources\Api\V1\WithdrawalResource;
use App\Models\Withdrawal;
use App\Services\WithdrawalService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WithdrawalController extends Controller
{
    use ApiResponse;

    protected WithdrawalService $withdrawalService;

    /**
     * @param WithdrawalService $withdrawalService
     */
    public function __construct(WithdrawalService $withdrawalService)
    {
        $this->withdrawalService = $withdrawalService;
    }

    /**
     * @throws BaseException
     */
    public function store(StoreWithdrawalRequest $request): JsonResponse {
        $result = $this->withdrawalService->createWithdrawal($request->validated());

        return $this->success(
            new WithdrawalResource($result),
            'New withdrawal request created successfully',
            201
        );
    }

    public function getVendorWithdrawals(): JsonResponse {
        $result = $this->withdrawalService->getVendorWithdrawals();

        return $this->paginated(
            WithdrawalResource::collection($result),
            'Vendor withdrawals retrieved successfully'
        );
    }

    public function getPendingWithdrawals(): JsonResponse {
        $result = $this->withdrawalService->getPendingWithdrawals();

        return $this->paginated(
            WithdrawalResource::collection($result),
            'Pending withdrawals retrieved successfully'
        );
    }

    public function approveWithdrawal(Withdrawal $withdrawal): JsonResponse {
        $result = $this->withdrawalService->approveWithdrawal($withdrawal);

        return $this->success(
            new WithdrawalResource($result),
            'Withdrawal request approved successfully'
        );
    }

    public function rejectWithdrawal(Request $request, Withdrawal $withdrawal): JsonResponse {
        $data = $request->validate(['note' => 'required|string|min:5']);

        $this->withdrawalService->rejectWithdrawal($withdrawal, $data['note']);

        return $this->success(
            null,
            'Withdrawal request rejected successfully'
        );
    }
}
