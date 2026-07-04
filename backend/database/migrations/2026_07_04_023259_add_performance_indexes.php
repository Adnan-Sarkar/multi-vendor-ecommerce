<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Products
        Schema::table('products', function (Blueprint $table) {
            $table->index('status');
            $table->index('vendor_id');
            $table->index('is_featured');
            $table->index('in_stock');
        });

        // Orders
        Schema::table('orders', function (Blueprint $table) {
            $table->index('user_id');
            $table->index('status');
            $table->index('payment_status');
        });

        // Reviews
        Schema::table('reviews', function (Blueprint $table) {
            $table->index('product_id');
            $table->index('is_approved');
        });

        // Cart items
        Schema::table('cart_items', function (Blueprint $table) {
            $table->index('cart_id');
        });

        // Withdrawals
        Schema::table('withdrawals', function (Blueprint $table) {
            $table->index('vendor_id');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropIndex(['status']);
            $table->dropIndex(['vendor_id']);
            $table->dropIndex(['is_featured']);
            $table->dropIndex(['in_stock']);
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->dropIndex(['user_id']);
            $table->dropIndex(['status']);
            $table->dropIndex(['payment_status']);
        });

        Schema::table('reviews', function (Blueprint $table) {
            $table->dropIndex(['product_id']);
            $table->dropIndex(['is_approved']);
        });

        Schema::table('cart_items', function (Blueprint $table) {
            $table->dropIndex(['cart_id']);
        });

        Schema::table('withdrawals', function (Blueprint $table) {
            $table->dropIndex(['vendor_id']);
            $table->dropIndex(['status']);
        });
    }
};
