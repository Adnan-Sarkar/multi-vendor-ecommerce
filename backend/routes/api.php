<?php

use \App\Http\Controllers\Api\V1\AuthController;
use \App\Http\Controllers\Api\V1\CategoryController;
use \App\Http\Controllers\Api\V1\ProductController;
use \App\Http\Controllers\Api\V1\Admin\ProductController as AdminProductController;
use \App\Http\Controllers\Api\V1\CartController;
use \App\Http\Controllers\Api\V1\AddressController;
use \App\Http\Controllers\Api\V1\OrderController;
use \App\Http\Controllers\Api\V1\WishlistController;
use \App\Http\Controllers\Api\V1\ReviewController;

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
        Route::get('/{product}/reviews', 'getProductReviews');
        Route::get('/{product}', 'show');
    });

    // Cart routes
    Route::prefix('/cart')->controller(CartController::class)->group(function () {
        // Private routes
        Route::middleware('auth:sanctum')->group(function () {
            Route::get('/', 'getCart');
            Route::post('/', 'addToCart');
            Route::patch('/{cartItem}', 'updateCartItem');
            Route::delete('/{cartItem}', 'removeCartItem');
            Route::delete('/', 'clearCart');
        });
    });

    // Address routes
    Route::prefix('/address')->controller(AddressController::class)->group(function () {
        Route::middleware('auth:sanctum')->group(function () {
            Route::get('/', 'index');
            Route::post('/', 'store');
            Route::patch('/{address}', 'update');
            Route::delete('/{address}', 'destroy');
            Route::patch('/{address}/set-default', 'setDefaultAddress');
        });
    });

    // Order routes
    Route::prefix('/order')->controller(OrderController::class)->group(function () {
        Route::middleware('auth:sanctum')->group(function () {
            Route::get('/', 'index');
            Route::get('/{order}', 'show');
            Route::post('/', 'store');
            Route::patch('/{order}/cancel', 'cancel');
        });
    });

    // Wishlist routes
    Route::prefix('/wishlist')->controller(WishlistController::class)->group(function () {
        Route::middleware(['auth:sanctum', 'role:customer'])->group(function () {
            Route::get('/', 'index');
            Route::post('/', 'store');
            Route::delete('/{product}', 'destroy');
        });
    });

    // Review routes
    Route::prefix('/review')->controller(ReviewController::class)->group(function () {
        Route::middleware(['auth:sanctum', 'role:customer'])->group(function () {
            Route::post('/', 'store');
        });
    });

    // Vendor routes
    Route::prefix('/vendor')->middleware(['auth:sanctum', 'role:vendor'])->group(function () {
        // Vendor order management
        Route::prefix('/orders')
            ->controller(\App\Http\Controllers\Api\V1\Vendor\OrderController::class)
            ->group(function () {
                Route::get('/', 'index');
                Route::patch('/{orderVendor}', 'update');
                Route::patch('/{orderVendor}/tracking-number', 'updateTrackingNumber');
            });
    });

    // Admin routes
    Route::prefix('/admin')->middleware(['auth:sanctum', 'role:super_admin|admin,api'])->group(function () {
        // Admin product management
        Route::prefix('/products')->controller(AdminProductController::class)->group(function () {
            Route::get('/', 'index');
            Route::post('/{product}/approve', 'approve');
            Route::post('/{product}/reject', 'reject');
        });

        // Admin order management
        Route::prefix('/orders')->controller(\App\Http\Controllers\Api\V1\Admin\OrderController::class)->group(function () {
            Route::get('/', 'index');
        });

        // Admin review management
        Route::prefix('/review')->controller(\App\Http\Controllers\Api\V1\Admin\ReviewController::class)->group(function () {
            Route::get('/', 'getPendingReviews');
            Route::post('/{review}/approve', 'approveReview');
        });
    });
});
