<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Address\StoreAddressRequest;
use App\Http\Requests\Api\V1\Address\UpdateAddressRequest;
use App\Http\Resources\Api\V1\AddressResource;
use App\Models\Address;
use App\Services\AddressService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    use ApiResponse;

    protected AddressService $addressService;

    /**
     * @param AddressService $addressService
     */
    public function __construct(AddressService $addressService)
    {
        $this->addressService = $addressService;
    }

    public function index(): JsonResponse {
        $result = $this->addressService->getUserAddresses();

        return $this->success(
            AddressResource::collection($result),
            'Addresses retrieved successfully'
        );
    }

    public function store(StoreAddressRequest $request): JsonResponse {
        $result = $this->addressService->createAddress($request->validated());

        return $this->success(
            new AddressResource($result),
            'Address created successfully',
            201);
    }

    public function update(UpdateAddressRequest $request, Address $address): JsonResponse {
        $result = $this->addressService->updateAddress($address, $request->validated());

        return $this->success(
            new AddressResource($result),
            'Address updated successfully');
    }

    public function destroy(Address $address): JsonResponse {
        $this->addressService->deleteAddress($address);

        return $this->success(
            null,
            'Address deleted successfully');
    }

    public function setDefaultAddress(Address $address): JsonResponse {
        $this->addressService->setDefaultAddress($address);

        return $this->success(
            null,
            'Set default address successfully');
    }
}
