<?php

namespace App\Repositories;

use App\Models\User;
use App\Models\VendorProfile;
use Illuminate\Pagination\LengthAwarePaginator;

class VendorRepository
{
    public function getPendingVendors(): LengthAwarePaginator {
        return VendorProfile::where('status', 'pending')
            ->with('user')
            ->latest()
            ->paginate(20);
    }

    public function approveVendor(VendorProfile $vendorProfile): VendorProfile {
        $vendorProfile->update(
            [
                'status' => 'approved',
                'approved_at' => now(),
            ]
        );

        return $vendorProfile->load('user');
    }

    public function rejectVendor(VendorProfile $vendorProfile, string $reason): void {
        $vendorProfile->update([
            'status' => 'rejected',
            'rejection_reason' => $reason,
        ]);
    }
}
