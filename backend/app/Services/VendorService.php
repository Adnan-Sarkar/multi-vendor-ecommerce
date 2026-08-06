<?php

namespace App\Services;

use App\Exceptions\BaseException;
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

    public function getPublicVendors(array $filters = []): LengthAwarePaginator {
        return $this->vendorRepository->getPublicVendors($filters);
    }

    /**
     * @throws BaseException
     */
    public function getVendorStorefront(VendorProfile $vendorProfile): VendorProfile {
        if ($vendorProfile->status !== 'approved') {
            throw new BaseException('Vendor not found', 404);
        }

        return $this->vendorRepository->getPublicVendorWithStats($vendorProfile);
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
