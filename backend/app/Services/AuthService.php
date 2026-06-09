<?php

namespace App\Services;

use App\Repositories\AuthRepository;

class AuthService
{
    protected AuthRepository $authRepository;

    /**
     * @param AuthRepository $authRepository
     */
    public function __construct(AuthRepository $authRepository)
    {
        $this->authRepository = $authRepository;
    }

    public function register(array $data) {
        $data['role'] = 'customer';
        $user = $this->authRepository->createUser($data);

        $user->assignRole('customer');
        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'user' => $user,
            'token' => $token,
        ];
    }
}
