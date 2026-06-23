<?php

namespace App\Services;

use App\Exceptions\BaseException;
use App\Models\Withdrawal;
use App\Repositories\WithdrawalRepository;
use Illuminate\Pagination\LengthAwarePaginator;

class WithdrawalService
{
    protected WithdrawalRepository $withdrawalRepository;

    /**
     * @param WithdrawalRepository $withdrawalRepository
     */
    public function __construct(WithdrawalRepository $withdrawalRepository)
    {
        $this->withdrawalRepository = $withdrawalRepository;
    }

    /**
     * @throws BaseException
     */
    public function createWithdrawal(array $data): Withdrawal {
        $vendorProfile = auth()->user()->vendorProfile;

        if ($data['amount'] > $vendorProfile->balance) {
            throw new BaseException('Insufficient balance', 400);
        }

        $data['vendor_id'] = $vendorProfile->id;

        return $this->withdrawalRepository->createWithdrawal($data);
    }

    public function getVendorWithdrawals(): LengthAwarePaginator {
        $vendorId = auth()->user()->vendorProfile->id;

        return $this->withdrawalRepository->getVendorWithdrawals($vendorId);
    }

    public function getPendingWithdrawals(): LengthAwarePaginator {
        return $this->withdrawalRepository->getPendingWithdrawals();
    }

    public function approveWithdrawal(Withdrawal $withdrawal): Withdrawal {
        return $this->withdrawalRepository->approveWithdrawal($withdrawal);
    }

    public function rejectWithdrawal(Withdrawal $withdrawal, string $note): void {
        $this->withdrawalRepository->rejectWithdrawal($withdrawal, $note);
    }
}
