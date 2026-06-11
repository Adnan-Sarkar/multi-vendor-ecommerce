<?php

namespace App\Repositories;

use App\Models\User;
use App\Models\VendorProfile;

class AuthRepository
{
    public function createUser(array $data) {
        return User::create($data);
    }

    public function findByEmail(string $email): ?User {
        return User::where('email', $email)->first();
    }

    public function getAuthenticatedUser(): User {
        $user = auth()->user();

        if ($user->role === 'customer') {
            $user->load('customerProfile');
        } elseif ($user->role === 'vendor') {
            $user->load('vendorProfile');
        }

        return $user;
    }

    public function updateUser(User $user, array $data): User {
        $user->update($data);
        return $user;
    }

    public function updateCustomerProfile(User $user, array $data): User {
        $user->customerProfile()->update($data);
        return $user;
    }
    public function updateVendorProfile(User $user, array $data): User {
        $user->vendorProfile()->update($data);
        return $user;
    }

    public function updatePassword(User $user, string $password): void {
        $user->update([
            'password' => $password
        ]);

        $user->tokens()->delete();
    }
}
