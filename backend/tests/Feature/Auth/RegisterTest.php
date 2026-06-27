<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RegisterTest extends TestCase
{
    use RefreshDatabase;

    public function test_customer_can_register_with_valid_data(): void {
        $data = [
            'name' => 'Test Customer',
            'email' => 'test@test.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'phone' => '01700000000',
        ];

        $response = $this->postJson('/api/v1/auth/register', $data);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    'user' => ['id', 'name', 'email', 'role'],
                    'token'
                ]
            ])
            ->assertJson(['success' => true]);
    }

    public function test_registration_fails_with_missing_name(): void {
        $response = $this->postJson('/api/v1/auth/register', [
            'email' => 'test@test.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'phone' => '01700000000',
        ]);

        $response->assertStatus(422);
    }

    public function test_registration_fails_with_missing_email(): void {
        $response = $this->postJson('/api/v1/auth/register', [
            'name' => 'Test Customer',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'phone' => '01700000000',
        ]);

        $response->assertStatus(422);
    }

    public function test_registration_fails_with_invalid_email_format(): void {
        $response = $this->postJson('/api/v1/auth/register', [
            'name' => 'Test Customer',
            'email' => 'test.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'phone' => '01700000000',
        ]);

        $response->assertStatus(422);
    }

    public function test_registration_fails_with_duplicate_email(): void {
        $this->postJson('/api/v1/auth/register', [
            'name' => 'Existing User',
            'email' => 'test@test.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'phone' => '01700000000',
        ]);

        $response = $this->postJson('/api/v1/auth/register', [
            'name' => 'Test Customer',
            'email' => 'test@test.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'phone' => '01700000000',
        ]);

        $response->assertStatus(422);
    }

    public function test_registration_fails_with_password_too_short(): void {
        $response = $this->postJson('/api/v1/auth/register', [
            'name' => 'Test Customer',
            'email' => 'test@test.com',
            'password' => 'pass',
            'password_confirmation' => 'pass',
            'phone' => '01700000000',
        ]);

        $response->assertStatus(422);
    }

    public function test_registration_fails_with_password_confirmation_mismatch(): void {
        $response = $this->postJson('/api/v1/auth/register', [
            'name' => 'Test Customer',
            'email' => 'test@test.com',
            'password' => 'password123',
            'password_confirmation' => 'password',
            'phone' => '01700000000',
        ]);

        $response->assertStatus(422);
    }

    public function test_registration_fails_with_missing_phone(): void {
        $response = $this->postJson('/api/v1/auth/register', [
            'name' => 'Test Customer',
            'email' => 'test@test.com',
            'password' => 'password123',
            'password_confirmation' => 'password',
        ]);

        $response->assertStatus(422);
    }
}
