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
            'low_stock_threshold' => 5,
            'status' => 'approved',
            'is_featured' => false,
            'views' => fake()->numberBetween(0, 5000),
            'approved_at' => now(),
        ];
    }

    public function featured(): static
    {
        return $this->state(fn () => ['is_featured' => true]);
    }

    public function onSale(): static
    {
        return $this->state(function (array $attributes) {
            $regularPrice = $attributes['regular_price'] ?? 5000;

            return ['sale_price' => (int) round($regularPrice * 0.8)];
        });
    }

    public function outOfStock(): static
    {
        return $this->state(fn () => ['stock_qty' => 0, 'in_stock' => false]);
    }

    public function lowStock(): static
    {
        return $this->state(fn () => ['stock_qty' => 3]);
    }

    public function pending(): static
    {
        return $this->state(fn () => ['status' => 'pending', 'approved_at' => null]);
    }
}
