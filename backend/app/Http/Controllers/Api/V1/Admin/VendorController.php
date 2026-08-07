<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\VendorProfileResource;
use App\Models\VendorProfile;
use App\Services\VendorService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class VendorController extends Controller
{
    use ApiResponse;

    protected VendorService $vendorService;

    /**
     * @param VendorService $vendorService
     */
    public function __construct(VendorService $vendorService)
    {
        $this->vendorService = $vendorService;
    }

    public function getPendingVendors(): JsonResponse {
        $result = $this->vendorService->getPendingVendors();

        return $this->paginated(
            VendorProfileResource::collection($result),
            'Pending vendors retrieved successfully'
        );
    }

    public function index(Request $request): JsonResponse {
        $result = $this->vendorService->getVendors($request->query('status'));

        return $this->paginated(
            VendorProfileResource::collection($result),
            'Vendors retrieved successfully'
        );
    }

    public function approveVendor(VendorProfile $vendorProfile): JsonResponse {
        $result = $this->vendorService->approveVendor($vendorProfile);

        return $this->success(
            new VendorProfileResource($result),
            'Vendor approved successfully'
        );
    }

    public function rejectVendor(Request $request, VendorProfile $vendorProfile): JsonResponse {
        $reason = $request->validate([
            'rejection_reason' => 'required|string|min:5'
        ]);

        $this->vendorService->rejectVendor($vendorProfile, $reason['rejection_reason']);

        return $this->success(null, 'Vendor rejected successfully');
    }
}
