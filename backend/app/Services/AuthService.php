<?php

namespace App\Services;

use App\Exceptions\AuthenticationException;
use App\Http\Resources\Api\V1\UserResource;
use App\Repositories\AuthRepository;
use Illuminate\Support\Facades\Hash;

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

    public function register(array $data): array {
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

    /** @throws AuthenticationException */
    public function login(array $data): array {
        $user = $this->authRepository->findByEmail($data['email']);

        if (!$user || !Hash::check($data['password'], $user->password)) {
            throw new AuthenticationException();
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'user' => new UserResource($user),
            'token' => $token,
        ];
    }

    public function logout(): void {
        auth()->user()->currentAccessToken()->delete();
    }
}
