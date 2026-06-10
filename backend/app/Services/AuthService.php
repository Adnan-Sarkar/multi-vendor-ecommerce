<?php

namespace App\Services;

use App\Http\Resources\Api\V1\UserResource;
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
        $data['is_active'] = true;
        $user = $this->authRepository->createUser($data);

        $user->assignRole('customer');
        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'user' => new UserResource($user),
            'token' => $token,
        ];
    }
}
