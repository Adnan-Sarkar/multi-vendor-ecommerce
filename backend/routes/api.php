<?php

use \App\Http\Controllers\Api\V1\AuthController;

// Health
Route::get('/health', function () {
    return response()->json([
        'success' => true,
        'message' => 'API is running',
        'version' => 'v1',
    ]);
});

Route::prefix('v1')->group(function () {
    // Auth routes
    Route::prefix('auth')->controller(AuthController::class)->group(function () {
        Route::post('/register', 'register');
        Route::post('/register-vendor', 'registerVendor');
        Route::post('/login', 'login');
        Route::post('/forgot-password', 'forgotPassword');
        Route::post('/reset-password', 'resetPassword');

        // private routes
        Route::middleware('auth:sanctum')->group(function () {
            Route::post('/logout', 'logout');
            Route::get('/profile', 'getProfile');
            Route::patch('/profile/customer', 'updateCustomer');
            Route::patch('/profile/vendor', 'updateVendor');
            Route::post('/change-password', 'changePassword');
        });
    });
});
