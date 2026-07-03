<?php

namespace Tests\Feature\Product;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductTest extends TestCase
{
    use RefreshDatabase;

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

    public function test_product_creation_fails_with_missing_name(): void {
        $vendor = $this->authenticatedVendor();
        $category = Category::factory()->create();

        $response = $this->actingAs($vendor, 'sanctum')
            ->postJson('/api/v1/product', [
                'short_description' => 'This is a test product short description',
                'description' => 'This is a test product long description',
                'categories' => [$category->id],
                'regular_price' => 10000,
                'manage_stock' => true,
                'in_stock' => true,
                'weight' => 0.5,
            ]);

        $response->assertStatus(422);
    }

    public function test_product_creation_fails_with_missing_short_description(): void {
        $vendor = $this->authenticatedVendor();
        $category = Category::factory()->create();

        $response = $this->actingAs($vendor, 'sanctum')
            ->postJson('/api/v1/product', [
                'name' => 'Test Product',
                'description' => 'This is a test product long description',
                'categories' => [$category->id],
                'regular_price' => 10000,
                'manage_stock' => true,
                'in_stock' => true,
                'weight' => 0.5,
            ]);

        $response->assertStatus(422);
    }

    public function test_product_creation_fails_with_missing_categories(): void {
        $vendor = $this->authenticatedVendor();
        $category = Category::factory()->create();

        $response = $this->actingAs($vendor, 'sanctum')
            ->postJson('/api/v1/product', [
                'name' => 'Test Product',
                'short_description' => 'This is a test product short description',
                'description' => 'This is a test product long description',
                'regular_price' => 10000,
                'manage_stock' => true,
                'in_stock' => true,
                'weight' => 0.5,
            ]);

        $response->assertStatus(422);
    }

    public function test_product_creation_fails_with_missing_regular_price(): void {
        $vendor = $this->authenticatedVendor();
        $category = Category::factory()->create();

        $response = $this->actingAs($vendor, 'sanctum')
            ->postJson('/api/v1/product', [
                'name' => 'Test Product',
                'short_description' => 'This is a test product short description',
                'description' => 'This is a test product long description',
                'categories' => [$category->id],
                'manage_stock' => true,
                'in_stock' => true,
                'weight' => 0.5,
            ]);

        $response->assertStatus(422);
    }

    public function test_anyone_can_get_product_list(): void {
        $response = $this->getJson('/api/v1/product');

        $response->assertStatus(200)
            ->assertJson(['success' => true]);
    }

    public function test_anyone_can_view_single_product(): void {
        $vendor = $this->authenticatedVendor();
        $category = Category::factory()->create();

        $productData = $this->actingAs($vendor, 'sanctum')
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

        $productId = $productData->json('data.id');

        Product::find($productId)->update(['status' => 'approved']);

        $response = $this->getJson("/api/v1/product/{$productId}");

        $response->assertStatus(200)
            ->assertJson(['success' => true]);
    }

    public function test_pending_product_returns_404(): void {
        $vendor = $this->authenticatedVendor();
        $category = Category::factory()->create();

        $productData = $this->actingAs($vendor, 'sanctum')
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

        $productId = $productData->json('data.id');

        $response = $this->getJson("/api/v1/product/{$productId}");

        $response->assertStatus(404);
    }

    public function test_product_list_returns_paginated_response(): void {
        $response = $this->getJson('/api/v1/product');

        $response->assertStatus(200)
            ->assertJsonStructure([
                    'success',
                    'data',
                    'meta' => [
                        'current_page',
                        'per_page',
                        'total',
                        'last_page',
                        'from',
                        'to',
                    ],
                    'links' => [
                        'first',
                        'last',
                        'next',
                        'prev',
                    ],
                ]);
    }

    public function test_only_approved_products_returned_in_public_list(): void {
        $vendor = $this->authenticatedVendor();
        $category = Category::factory()->create();

        $product1Data = $this->actingAs($vendor, 'sanctum')
            ->postJson('/api/v1/product', [
                'name' => 'Test Product 1',
                'short_description' => 'This is a test product short description 1',
                'description' => 'This is a test product long description 1',
                'categories' => [$category->id],
                'regular_price' => 10000,
                'manage_stock' => true,
                'in_stock' => true,
                'weight' => 0.5,
            ]);

        $this->actingAs($vendor, 'sanctum')
            ->postJson('/api/v1/product', [
                'name' => 'Test Product 2',
                'short_description' => 'This is a test product short description 2',
                'description' => 'This is a test product long description 2',
                'categories' => [$category->id],
                'regular_price' => 10000,
                'manage_stock' => true,
                'in_stock' => true,
                'weight' => 0.5,
            ]);

        $product1Id = $product1Data->json('data.id');

        Product::find($product1Id)->update(['status' => 'approved']);

        $response = $this->getJson("/api/v1/product");

        $response->assertStatus(200);

        foreach ($response->json('data') as $product) {
                $this->assertEquals('approved', $product['status']);
        }
    }

    public function test_vendor_can_update_their_product(): void {
        $vendor = $this->authenticatedVendor();
        $category = Category::factory()->create();

        $productData = $this->actingAs($vendor, 'sanctum')
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

        $productId = $productData->json('data.id');

        Product::find($productId)->update(['status' => 'approved']);

        $response = $this->actingAs($vendor, 'sanctum')
            ->patchJson("/api/v1/product/{$productId}", [
                "regular_price" => 43000,
                "sale_price" => 40000,
                "stock_qty" => 45
            ]);

        $response->assertStatus(200)
            ->assertJson(["success" => true]);
    }

    public function test_vendor_can_delete_their_product(): void {
        $vendor = $this->authenticatedVendor();
        $category = Category::factory()->create();

        $productData = $this->actingAs($vendor, 'sanctum')
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

        $productId = $productData->json('data.id');

        Product::find($productId)->update(['status' => 'approved']);

        $response = $this->actingAs($vendor, 'sanctum')
            ->deleteJson("/api/v1/product/{$productId}");

        $response->assertStatus(200)
            ->assertJson(["success" => true]);
    }
}
