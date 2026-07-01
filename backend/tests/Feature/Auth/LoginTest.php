<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LoginTest extends TestCase
{
    use RefreshDatabase;

    public function test_customer_can_login_with_valid_data(): void {
        $user = User::factory()->create();

        $response = $this->postJson('/api/v1/auth/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => ['token', 'user']
            ])
            ->assertJson(['success' => true]);
    }

    public function test_login_fails_with_missing_email(): void {
        $response = $this->postJson('/api/v1/auth/login', [
            'password' => 'password',
        ]);

        $response->assertStatus(422);
    }

    public function test_login_fails_with_missing_password(): void {
        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'abc@example.com',
        ]);

        $response->assertStatus(422);
    }

    public function test_login_fails_with_invalid_email(): void {
        $user = User::factory()->create();

        $response = $this->postJson('/api/v1/auth/login', [
            'email' => 'abc@example.com',
            'password' => 'password',
        ]);

        $response->assertStatus(401);
    }

    public function test_login_fails_with_invalid_password(): void {
        $user = User::factory()->create();

        $response = $this->postJson('/api/v1/auth/login', [
            'email' => $user->email,
            'password' => '12345678',
        ]);

        $response->assertStatus(401);
    }
}
