<?php

namespace App\Repositories;

use App\Models\User;

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
}
