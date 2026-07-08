<?php

namespace App\Services;

use App\Models\VendorProfile;
use App\Notifications\VendorApprovedNotification;
use App\Repositories\VendorRepository;
use Illuminate\Pagination\LengthAwarePaginator;

class VendorService
{
    protected VendorRepository $vendorRepository;

    /**
     * @param VendorRepository $vendorRepository
     */
    public function __construct(VendorRepository $vendorRepository)
    {
        $this->vendorRepository = $vendorRepository;
    }

    public function getPendingVendors(): LengthAwarePaginator {
        return $this->vendorRepository->getPendingVendors();
    }

    public function approveVendor(VendorProfile $vendorProfile): VendorProfile {
        $result = $this->vendorRepository->approveVendor($vendorProfile);

        $vendorProfile->user
            ->notify(new VendorApprovedNotification($vendorProfile));

        return $result;

    }

    public function rejectVendor(VendorProfile $vendorProfile, string $reason): void {
        $this->vendorRepository->rejectVendor($vendorProfile, $reason);
    }
}
