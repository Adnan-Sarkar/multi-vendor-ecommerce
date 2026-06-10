<?php

namespace App\Http\Controllers\Api\V1;

use App\Exceptions\AuthenticationException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Auth\LoginRequest;
use App\Http\Requests\Api\V1\Auth\RegisterRequest;
use App\Services\AuthService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    use ApiResponse;
    protected AuthService $authService;

    /**
     * @param AuthService $authService
     */
    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(RegisterRequest $request): JsonResponse {
        $result = $this->authService->register($request->validated());

        return $this->success($result, 'Customer registered successfully', 201);
    }

    public function login(LoginRequest $request): JsonResponse {
        try {
            $result = $this->authService->login($request->validated());

            return $this->success($result, 'Login successful', 200);
        } catch (AuthenticationException $e) {
            return $this->error($e->getMessage(), $e->getCode());
        }
    }

    public function logout(): JsonResponse {
        $this->authService->logout();

        return $this->success(null, "Logout successful", 200);
    }

    public function getProfile(): JsonResponse {
        return $this->success(
            $this->authService->getProfile(),
            'Customer profile retrieved successfully'
        );
    }
}
