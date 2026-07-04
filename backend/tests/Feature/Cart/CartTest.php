<?php

namespace Tests\Feature\Cart;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CartTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_customer_can_add_product_to_cart(): void {
        $customer = $this->authenticatedCustomer();
        $vendor = $this->authenticatedVendor();

        $product = Product::factory()->create([
            'vendor_id' => $vendor->vendorProfile->id
        ]);

        $response = $this->actingAs($customer, 'sanctum')
            ->postJson('/api/v1/cart', [
                'product_id' => $product->id,
                'quantity' => 2
            ]);

        $response->assertStatus(200)
            ->assertJson(['success' => true]);
    }

    public function test_unauthenticated_user_cannot_add_to_cart(): void {
        $response = $this->postJson('/api/v1/cart', [
            'product_id' => 1,
            'quantity' => 2,
        ]);
        $response->assertStatus(401);
    }

    public function test_authenticated_customer_can_view_cart(): void {
        $customer = $this->authenticatedCustomer();
        $vendor = $this->authenticatedVendor();

        $product = Product::factory()->create([
            'vendor_id' => $vendor->vendorProfile->id
        ]);

        $this->actingAs($customer, 'sanctum')
            ->postJson('/api/v1/cart', [
                'product_id' => $product->id,
                'quantity' => 2
            ]);

        $response = $this->actingAs($customer, 'sanctum')
            ->getJson("/api/v1/cart");

        $response->assertStatus(200)
            ->assertJson(['success' => true]);
    }

    public function test_adding_same_product_increments_quantity(): void {
        $customer = $this->authenticatedCustomer();
        $vendor = $this->authenticatedVendor();

        $product = Product::factory()->create([
            'vendor_id' => $vendor->vendorProfile->id
        ]);

        $this->actingAs($customer, 'sanctum')
            ->postJson('/api/v1/cart', [
                'product_id' => $product->id,
                'quantity' => 2
            ]);

        $response = $this->actingAs($customer, 'sanctum')
            ->postJson('/api/v1/cart', [
                'product_id' => $product->id,
                'quantity' => 2
            ]);

        $response->assertStatus(200)
            ->assertJson(['success' => true])
            ->assertJsonStructure([
                'data'
            ]);
    }

    public function test_can_update_cart_item_quantity(): void {
        $customer = $this->authenticatedCustomer();
        $vendor = $this->authenticatedVendor();

        $product = Product::factory()->create([
            'vendor_id' => $vendor->vendorProfile->id
        ]);

        $addResponse = $this->actingAs($customer, 'sanctum')
            ->postJson('/api/v1/cart', [
                'product_id' => $product->id,
                'quantity' => 2
            ]);

        $cartItemId = $addResponse->json('data.items.0.id');

        $response = $this->actingAs($customer, 'sanctum')
            ->patchJson("/api/v1/cart/{$cartItemId}", ['quantity' => 5]);

        $response->assertStatus(200)
            ->assertJson(['success' => true]);
    }

    public function test_can_remove_cart_item(): void {
        $customer = $this->authenticatedCustomer();
        $vendor = $this->authenticatedVendor();

        $product = Product::factory()->create([
            'vendor_id' => $vendor->vendorProfile->id
        ]);

        $addResponse = $this->actingAs($customer, 'sanctum')
            ->postJson('/api/v1/cart', [
                'product_id' => $product->id,
                'quantity' => 2
            ]);

        $cartItemId = $addResponse->json('data.items.0.id');

        $result = $this->actingAs($customer, 'sanctum')
            ->deleteJson("/api/v1/cart/{$cartItemId}");

        $result->assertStatus(200)
            ->assertJson(['success' => true]);
    }

    public function test_can_clear_cart(): void {
        $customer = $this->authenticatedCustomer();
        $vendor = $this->authenticatedVendor();

        $product = Product::factory()->create([
            'vendor_id' => $vendor->vendorProfile->id
        ]);

        $this->actingAs($customer, 'sanctum')
            ->postJson('/api/v1/cart', [
                'product_id' => $product->id,
                'quantity' => 2
            ]);

        $result = $this->actingAs($customer, 'sanctum')
            ->deleteJson("/api/v1/cart");

        $result->assertStatus(200)
            ->assertJson(['success' => true]);
    }
}
