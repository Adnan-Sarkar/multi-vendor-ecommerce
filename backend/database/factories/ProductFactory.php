<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\VendorProfile;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(3, true),
            'slug' => fake()->unique()->slug(),
            'sku' => strtoupper(fake()->unique()->bothify('??-####')),
            'short_description' => fake()->sentence(),
            'description' => fake()->paragraph(),
            'thumbnail' => null,
            'regular_price' => fake()->numberBetween(1000, 100000),
            'sale_price' => null,
            'stock_qty' => fake()->numberBetween(1, 100),
            'manage_stock' => true,
            'in_stock' => true,
            'weight' => fake()->randomFloat(2, 0.1, 10),
            'status' => 'approved',
            'is_featured' => false,
            'views' => 0,
        ];
    }
}
