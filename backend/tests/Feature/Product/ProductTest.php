<?php

namespace Tests\Feature\Product;

use App\Models\Category;
use App\Models\User;
use App\Models\VendorProfile;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Tests\TestCase;

class ProductTest extends TestCase
{
    use RefreshDatabase;

    protected function authenticatedVendor(): User
    {
        $user = User::factory()->create(['role' => 'vendor']);
        $user->assignRole('vendor');
        $user->givePermissionTo('manage-own-products');

        VendorProfile::factory()->create(['user_id' => $user->id]);

        return $user;
    }

    public function test_vendor_can_create_product_with_valid_data(): void {
        $vendor = $this->authenticatedVendor();
        $category = Category::factory()->create();

        $response = $this->actingAs($vendor, 'sanctum')
            ->postJson('/api/v1/product', [
                'name' => 'Test Product',
                'short_description' => 'This is a test product short description',
                'description' => 'This is a test product long description',
                'categories' => [$category->id],
                'regular_price' => 10000,
                'manage_stock' => true,
                'in_stock' => true,
                'weight' => 0.5,
            ]);

        $response->assertStatus(201)
            ->assertJson(['success' => true]);
    }

    public function test_customer_cannot_create_product(): void {
        $customer = User::factory()->create(['role' => 'customer']);
        $customer->assignRole('customer');
        $category = Category::factory()->create();

        $response = $this->actingAs($customer, 'sanctum')
            ->postJson('/api/v1/product', [
            'name' => 'Test Product',
            'short_description' => 'This is a test product short description',
            'description' => 'This is a test product long description',
            'categories' => [$category->id],
            'regular_price' => 10000,
            'manage_stock' => true,
            'in_stock' => true,
            'weight' => 0.5,
        ]);

        $response->assertStatus(403);
    }

}
