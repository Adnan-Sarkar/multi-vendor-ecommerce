<?php

namespace App\Repositories;

use App\Models\Withdrawal;
use Illuminate\Pagination\LengthAwarePaginator;

class WithdrawalRepository
{
    public function createWithdrawal(array $data): Withdrawal {
        $withdrawal = Withdrawal::create($data);

        return $withdrawal->load(['vendor']);
    }

    public function getVendorWithdrawals(int $vendorId): LengthAwarePaginator {
        return Withdrawal::where('vendor_id', $vendorId)
            ->latest()
            ->paginate(20);
    }

    public function getPendingWithdrawals(): LengthAwarePaginator {
        return Withdrawal::where('status', 'pending')
            ->with(['vendor'])
            ->latest()
            ->paginate(20);
    }

    public function approveWithdrawal(Withdrawal $withdrawal): Withdrawal {
        $withdrawal->update([
            'status' => 'approved',
            'processed_at' => now()
        ]);

        $withdrawal->vendor->decrement('balance', $withdrawal->amount);
        $withdrawal->vendor->increment('total_withdrawn', $withdrawal->amount);

        return $withdrawal->load(['vendor']);
    }

    public function rejectWithdrawal(Withdrawal $withdrawal, string $note): void {
        $withdrawal->update([
            'status' => 'rejected',
            'admin_note' => $note,
            'processed_at' => now(),
        ]);
    }
}
