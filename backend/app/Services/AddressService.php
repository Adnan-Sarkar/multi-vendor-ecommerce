<?php

namespace App\Services;

use App\Models\Address;
use App\Repositories\AddressRepository;
use Illuminate\Support\Collection;

class AddressService
{
    protected AddressRepository $addressRepository;

    /**
     * @param AddressRepository $addressRepository
     */
    public function __construct(AddressRepository $addressRepository)
    {
        $this->addressRepository = $addressRepository;
    }

    public function createAddress(array $data): Address {
        $userId = auth()->user()->id;

        return $this->addressRepository->createAddress($userId, $data);
    }

    public function getUserAddresses(): Collection {
        $userId = auth()->user()->id;

        return $this->addressRepository->getUserAddresses($userId);
    }

    public function updateAddress(Address $address, array $data): Address {
        return $this->addressRepository->updateAddress($address, $data);
    }

    public function deleteAddress(Address $address): void {
        $this->addressRepository->deleteAddress($address);
    }

    public function setDefaultAddress(Address $address): void {
        $this->addressRepository->setDefaultAddress($address);
    }
}
