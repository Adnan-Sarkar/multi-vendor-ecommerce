<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\VendorProfile;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<VendorProfile>
 */
class VendorProfileFactory extends Factory
{
    protected $model = VendorProfile::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $shopName = $this->faker->unique()->company();

        return [
            'user_id' => User::factory(),
            'shop_name' => $shopName,
            'slug' => Str::slug($shopName) . '-' . $this->faker->unique()->numberBetween(1000, 9999),
            'description' => $this->faker->sentence(),
            'logo' => null,
            'banner' => null,
            'address' => $this->faker->streetAddress(),
            'city' => $this->faker->city(),
            'state' => $this->faker->word(),
            'zip_code' => $this->faker->postcode(),
            'status' => 'approved',
            'commission_rate' => 10.00,
            'total_withdrawn' => 0,
            'total_earnings' => 0,
            'balance' => 0,
            'rejection_reason' => null,
            'approved_at' => now(),
        ];
    }
}
