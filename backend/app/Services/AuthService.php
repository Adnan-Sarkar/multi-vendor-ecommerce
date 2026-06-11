<?php

namespace App\Services;

use App\Exceptions\AuthenticationException;
use App\Http\Resources\Api\V1\UserResource;
use App\Models\User;
use App\Repositories\AuthRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Throwable;

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
        $user->customerProfile()->create([]);

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
        auth()->user()->tokens()->delete();
    }

    public function getProfile(): UserResource {
        $user = $this->authRepository->getAuthenticatedUser();
        return new UserResource($user);
    }

    /**
     * @throws Throwable
     */
    public function updateCustomerProfile(array $data): UserResource {
        return DB::transaction(function () use ($data) {
            $user = auth()->user();

            $userData = array_filter([
                'name' => $data['name'] ?? null,
                'phone' => $data['phone'] ?? null,
                'avatar' => $data['avatar'] ?? null,
            ]);

            $profileData = array_filter([
                'date_of_birth' => $data['date_of_birth'] ?? null,
                'gender' => $data['gender'] ?? null,
            ]);

            $this->authRepository->updateUser($user, $userData);
            $this->authRepository->updateCustomerProfile($user, $profileData);

            return new UserResource($this->authRepository->getAuthenticatedUser());
        });
    }

    /**
     * @throws Throwable
     */
    public function updateVendorProfile(array $data): UserResource {
        return DB::transaction(function () use ($data) {
            $user = auth()->user();

            $userData = array_filter([
                'name' => $data['name'] ?? null,
                'phone' => $data['phone'] ?? null,
                'avatar' => $data['avatar'] ?? null,
            ]);

            $profileData = array_filter([
                'shop_name' => $data['shop_name'] ?? null,
                'description' => $data['description'] ?? null,
                'logo' => $data['logo'] ?? null,
                'banner' => $data['banner'] ?? null,
                'address' => $data['address'] ?? null,
                'city' => $data['city'] ?? null,
                'state' => $data['state'] ?? null,
                'zip_code' => $data['zip_code'] ?? null,
            ]);

            $this->authRepository->updateUser($user, $userData);
            $this->authRepository->updateVendorProfile($user, $profileData);

            return new UserResource($this->authRepository->getAuthenticatedUser());
        });
    }
}
