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
        Schema::create('product_variants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->string('sku')->unique();
            $table->decimal('price', 10, 2);
            $table->integer('stock_qty');
            $table->boolean('in_stock')->default(true);
            $table->string('image')->nullable();
            $table->timestamps();
        });

        Schema::create('product_attributes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('product_attribute_values', function (Blueprint $table) {
            $table->id();
            $table->foreignId('attribute_id')->constrained('product_attributes')->onDelete('cascade');
            $table->string('value');
            $table->timestamps();
        });

        Schema::create('product_variant_attributes', function (Blueprint $table) {
            $table->foreignId('variant_id')->constrained('product_variants')->onDelete('cascade');
            $table->foreignId('attribute_value_id')->constrained('product_attribute_values')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_variant_attributes');
        Schema::dropIfExists('product_attribute_values');
        Schema::dropIfExists('product_attributes');
        Schema::dropIfExists('product_variants');
    }
};
