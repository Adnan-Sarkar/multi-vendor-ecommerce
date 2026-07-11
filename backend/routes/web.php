<?php

use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\SslcommerzController;

Route::prefix('sslcommerz')->controller(SslcommerzController::class)->group(function () {
    Route::post('/success', 'success')->name('sslc.success');
    Route::post('/failure', 'failure')->name('sslc.failure');
    Route::post('/cancel', 'cancel')->name('sslc.cancel');
    Route::post('/ipn', 'ipn')->name('sslc.ipn');
});
