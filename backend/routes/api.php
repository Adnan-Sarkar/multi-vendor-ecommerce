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
use \App\Http\Controllers\Api\V1\Admin\VendorController;
use \App\Http\Controllers\Api\V1\CouponController;
use \App\Http\Controllers\Api\V1\WithdrawalController;
use \App\Http\Controllers\Api\V1\Vendor\DashboardController;
use \App\Http\Controllers\Api\V1\Admin\DashboardController as AdminDashboardController;
use \App\Http\Controllers\Api\V1\NotificationController;
use \App\Http\Controllers\Api\V1\TagController;
use \App\Http\Controllers\Api\V1\AttributeController;
use \App\Http\Controllers\Api\V1\PaymentController;
use \App\Http\Controllers\Api\V1\PublicVendorController;

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
        Route::post('/register', 'register')->middleware('throttle:register');
        Route::post('/register-vendor', 'registerVendor');
        Route::post('/login', 'login')->middleware('throttle:login');
        Route::post('/forgot-password', 'forgotPassword')->middleware('throttle:forgot-password');
        Route::post('/reset-password', 'resetPassword');

        // private routes
        Route::middleware(['auth:sanctum', 'throttle:api'])->group(function () {
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
        Route::middleware(['auth:sanctum', 'permission:manage-categories', 'throttle:api'])->group(function () {
            Route::post('/', 'store');
            Route::patch('/{category}', 'update');
            Route::delete('/{category}', 'destroy');
        });
    });

    // Product routes
    Route::prefix('/product')->controller(ProductController::class)->group(function () {
        // Private routes
        Route::middleware(['auth:sanctum', 'permission:manage-own-products', 'throttle:api'])->group(function () {
            Route::get('/me/products', 'myProducts');
            Route::get('/me/products/{product}', 'showMyProduct');
            Route::post('/', 'store');
            Route::post('/{product}/images', 'storeProductImages');
            Route::post('/{product}/variants', 'storeProductVariant');
            Route::patch('/{product}/variants/{variant}', 'updateProductVariant');
            Route::delete('/{product}/variants/{variant}', 'destroyProductVariant');
            Route::patch('/{product}', 'update');
            Route::delete('/{product}', 'destroy');
        });

        // Public routes
        Route::get('/', 'index');
        Route::get('/{product:slug}/reviews', 'getProductReviews');
        Route::get('/{product:slug}/variants', 'getProductVariants');
        Route::get('/{product:slug}', 'show');
    });

    // Public vendor storefront routes
    Route::prefix('/vendors')->controller(PublicVendorController::class)->group(function () {
        Route::get('/', 'index');
        Route::get('/{vendorProfile:slug}/products', 'products');
        Route::get('/{vendorProfile:slug}', 'show');
    });

    // Cart routes
    Route::prefix('/cart')->controller(CartController::class)->group(function () {
        // Private routes
        Route::middleware(['auth:sanctum', 'throttle:api'])->group(function () {
            Route::get('/', 'getCart');
            Route::post('/', 'addToCart');
            Route::patch('/{cartItem}', 'updateCartItem');
            Route::delete('/{cartItem}', 'removeCartItem');
            Route::delete('/', 'clearCart');
        });
    });

    // Address routes
    Route::prefix('/address')->controller(AddressController::class)->group(function () {
        Route::middleware(['auth:sanctum', 'throttle:api'])->group(function () {
            Route::get('/', 'index');
            Route::post('/', 'store');
            Route::patch('/{address}', 'update');
            Route::delete('/{address}', 'destroy');
            Route::patch('/{address}/set-default', 'setDefaultAddress');
        });
    });

    // Order routes
    Route::prefix('/order')->controller(OrderController::class)->group(function () {
        Route::middleware(['auth:sanctum', 'throttle:api'])->group(function () {
            Route::get('/', 'index');
            Route::get('/{order}', 'show');
            Route::post('/', 'store');
            Route::patch('/{order}/cancel', 'cancel');
        });
    });

    // Wishlist routes
    Route::prefix('/wishlist')->controller(WishlistController::class)->group(function () {
        Route::middleware(['auth:sanctum', 'role:customer', 'throttle:api'])->group(function () {
            Route::get('/', 'index');
            Route::get('/ids', 'productIds');
            Route::post('/', 'store');
            Route::delete('/{product}', 'destroy');
        });
    });

    // Review routes
    Route::prefix('/review')->controller(ReviewController::class)->group(function () {
        Route::middleware(['auth:sanctum', 'role:customer', 'throttle:api'])->group(function () {
            Route::post('/', 'store');
        });
    });

    // Coupon routes
    Route::prefix('/coupon')->controller(CouponController::class)->group(function () {
        Route::middleware(['auth:sanctum', 'throttle:api'])->group(function () {
            Route::post('/apply', 'applyCoupon');
        });
    });

    // Notification routes
    Route::prefix('/notifications')->controller(NotificationController::class)->group(function () {
        Route::middleware(['auth:sanctum', 'throttle:api'])->group(function () {
            Route::get('/', 'index');
            Route::get('/unread-count', 'unreadCount');
            Route::patch('/read-all', 'markAllAsRead');
            Route::patch('/{id}/read', 'markAsRead');
        });
    });

    // Tag routes
    Route::prefix('/tag')->controller(TagController::class)->group(function () {
        Route::get('/', 'index');

        // Admin only
        Route::middleware(['auth:sanctum', 'role:super_admin|admin', 'throttle:api'])->group(function () {
            Route::post('/', 'store');
            Route::delete('/{tag}', 'destroy');
        });
    });

    // Attribute routes
    Route::prefix('/attribute')->controller(AttributeController::class)->group(function () {
        Route::get('/', 'index');

        // Admin only
        Route::middleware(['auth:sanctum', 'role:super_admin|admin'])->group(function () {
            Route::post('/', 'store');
            Route::post('/{attribute}/values', 'storeValue');
            Route::delete('/{attribute}', 'destroy');
            Route::delete('/values/{value}', 'destroyValue');
        });
    });

    // Payment routes
    Route::prefix('/payment')->controller(PaymentController::class)->group(function () {
        Route::middleware(['auth:sanctum', 'throttle:api'])->group(function () {
            Route::post('/{order}/initiate', 'initiatePayment');
        });
    });

    // Vendor routes
    Route::prefix('/vendor')->middleware(['auth:sanctum', 'role:vendor', 'throttle:api'])->group(function () {
        // Vendor order management
        Route::prefix('/orders')
            ->controller(\App\Http\Controllers\Api\V1\Vendor\OrderController::class)
            ->group(function () {
                Route::get('/', 'index');
                Route::patch('/{orderVendor}', 'update');
                Route::patch('/{orderVendor}/tracking-number', 'updateTrackingNumber');
            });

        // Vendor coupon management
        Route::prefix('/coupon')->controller(CouponController::class)->group(function () {
            Route::get('/', 'vendorIndex');
            Route::post('/', 'store');
            Route::delete('/{coupon}', 'destroy');
        });

        // Vendor review management
        Route::prefix('/reviews')->controller(\App\Http\Controllers\Api\V1\Vendor\ReviewController::class)->group(function () {
            Route::get('/product/{product}', 'productReviews');
            Route::patch('/{review}/reply', 'reply');
        });

        // Vendor withdrawals management
        Route::prefix('/withdrawals')->controller(WithdrawalController::class)->group(function () {
                Route::get('/', 'getVendorWithdrawals');
                Route::post('/', 'store');
        });

        // Vendor dashboard routes
        Route::prefix('/dashboard')->controller(DashboardController::class)->group(function () {
            Route::get('/', 'index');
        });
    });

    // Admin routes
    Route::prefix('/admin')->middleware(['auth:sanctum', 'role:super_admin|admin'])->group(function () {
        // Admin vendor management
        Route::prefix('/vendor')->controller(VendorController::class)->group(function () {
            Route::get('/pending', 'getPendingVendors');
            Route::post('/{vendorProfile}/approve', 'approveVendor');
            Route::post('/{vendorProfile}/reject', 'rejectVendor');
        });

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
            Route::get('/', 'index');
            Route::post('/{review}/approve', 'approveReview');
        });

        // Admin coupon management
        Route::prefix('/coupon')->controller(CouponController::class)->group(function () {
            Route::get('/', 'adminIndex');
            Route::delete('/{coupon}', 'destroy');
        });

        // Admin withdrawals management
        Route::prefix('/withdrawals')->controller(WithdrawalController::class)->group(function () {
                Route::get('/', 'getPendingWithdrawals');
                Route::post('/{withdrawal}/approve', 'approveWithdrawal');
                Route::post('/{withdrawal}/reject', 'rejectWithdrawal');
        });

        // Admin dashboard routes
        Route::prefix('/dashboard')->controller(AdminDashboardController::class)->group(function () {
            Route::get('/', 'index');
        });
    });
});
