<?php

namespace App\Repositories;

use App\Models\Address;
use Illuminate\Support\Collection;

class AddressRepository
{
    public function createAddress(int $userId, array $data): Address {
        return Address::create([
            'user_id' => $userId,
            ...$data
        ]);
    }

    public function getUserAddresses(int $userId): Collection {
        return Address::where('user_id', $userId)->get();
    }

    public function updateAddress(Address $address, array $data): Address {
        $address->update($data);

        return $address->refresh();
    }

    public function deleteAddress(Address $address): void {
        $address->delete();
    }

    public function setDefaultAddress(Address $address): void {
        Address::where('user_id', $address->user_id)
            ->where('type', $address->type)
            ->update(['is_default', false]);

        $address->update([
            'is_default' => true
        ]);
    }
}
