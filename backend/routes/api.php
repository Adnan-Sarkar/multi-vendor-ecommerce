<?php

use \App\Http\Controllers\Api\V1\AuthController;
use \App\Http\Controllers\Api\V1\CategoryController;
use \App\Http\Controllers\Api\V1\ProductController;

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

    // Category routes
    Route::prefix('/category')->controller(CategoryController::class)->group(function () {
        Route::get('/', 'index');
        Route::get('/{category}', 'show');

        // private routes
        Route::middleware(['auth:sanctum', 'permission:manage-categories,api'])->group(function () {
            Route::post('/', 'store');
            Route::patch('/{category}', 'update');
            Route::delete('/{category}', 'destroy');
        });
    });

    // Product routes
    Route::prefix('/product')->controller(ProductController::class)->group(function () {
        // Private routes
        Route::middleware(['auth:sanctum', 'permission:manage-own-products,api'])->group(function () {
            Route::get('/me/products', 'myProducts');
            Route::post('/', 'store');
            Route::post('/{product}/images', 'storeProductImages');
            Route::post('/{product}/variants', 'storeProductVariant');
            Route::patch('/{product}', 'update');
            Route::delete('/{product}', 'destroy');
        });

        // Public routes
        Route::get('/', 'index');
        Route::get('/{product}', 'show');
    });
});
