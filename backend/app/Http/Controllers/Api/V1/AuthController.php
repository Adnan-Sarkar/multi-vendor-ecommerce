<?php

namespace App\Http\Controllers\Api\V1;

use App\Exceptions\AuthenticationException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Auth\ChangePasswordRequest;
use App\Http\Requests\Api\V1\Auth\ForgotPasswordRequest;
use App\Http\Requests\Api\V1\Auth\LoginRequest;
use App\Http\Requests\Api\V1\Auth\RegisterRequest;
use App\Http\Requests\Api\V1\Auth\ResetPasswordRequest;
use App\Http\Requests\Api\V1\Auth\UpdateCustomerProfileRequest;
use App\Http\Requests\Api\V1\Auth\UpdateVendorProfileRequest;
use App\Http\Requests\Api\V1\Auth\VendorRegisterRequest;
use App\Services\AuthService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Throwable;

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

    /**
     * @throws Throwable
     */
    public function registerVendor(VendorRegisterRequest $request):JsonResponse {
        $result = $this->authService->registerVendor($request->validated());

        return $this->success($result, 'Vendor registered successfully', 201);
    }

    /**
     * @throws AuthenticationException
     */
    public function login(LoginRequest $request): JsonResponse {
        $result = $this->authService->login($request->validated());

        return $this->success($result, 'Login successful');
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

    /**
     * @throws Throwable
     */
    public function updateCustomer(UpdateCustomerProfileRequest $request): JsonResponse {
        $result = $this->authService->updateCustomerProfile($request->validated());

        return $this->success($result, 'Customer profile updated successfully');
    }

    /**
     * @throws Throwable
     */
    public function updateVendor(UpdateVendorProfileRequest $request): JsonResponse {
        $result = $this->authService->updateVendorProfile($request->validated());

        return $this->success($result, 'Vendor profile updated successfully');
    }

    public function forgotPassword(ForgotPasswordRequest $request): JsonResponse {
        $this->authService->forgotPassword($request->email);

        return $this->success(null, 'OTP sends successfully');
    }

    /**
     * @throws Throwable
     * @throws AuthenticationException
     */
    public function resetPassword(ResetPasswordRequest $request): JsonResponse {
        $this->authService->resetPassword($request->validated());

        return $this->success(null, 'Password reset successfully');
    }

    /**
     * @throws AuthenticationException
     */
    public function changePassword(ChangePasswordRequest $request): JsonResponse {
        $this->authService->changePassword($request->validated());

        return $this->success(null, 'Password changed successfully');
    }
}
