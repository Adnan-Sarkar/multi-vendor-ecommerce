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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vendor_id')->constrained('vendor_profiles')->onDelete('cascade');
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('sku')->unique();
            $table->text('short_description');
            $table->text('description')->nullable();
            $table->string('thumbnail')->nullable();
            $table->decimal('regular_price', 10, 2);
            $table->decimal('sale_price', 10, 2)->nullable();
            $table->dateTime('sale_start_date')->nullable();
            $table->dateTime('sale_end_date')->nullable();
            $table->integer('stock_qty')->nullable();
            $table->integer('low_stock_threshold')->nullable();
            $table->boolean('manage_stock')->default(true);
            $table->boolean('in_stock')->default(true);
            $table->decimal('weight', 8, 2)->default(0);
            $table->decimal('length', 5, 2)->nullable();
            $table->decimal('width', 5, 2)->nullable();
            $table->decimal('height', 5, 2)->nullable();
            $table->enum('status', ['draft', 'pending', 'approved', 'rejected', 'archived'])->default('pending');
            $table->boolean('is_featured')->default(false);
            $table->bigInteger('views')->default(0);
            $table->string('rejection_reason')->nullable();
            $table->dateTime('approved_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

//        Create product tags table
        Schema::create('product_tags', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->timestamps();
        });

//        Create tags and product pivot table
        Schema::create('product_tag', function (Blueprint $table) {
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->foreignId('tag_id')->constrained('product_tags')->onDelete('cascade');
        });

//        Create category and product pivot table
        Schema::create('category_product', function (Blueprint $table) {
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
