<?php

namespace Tests;

use App\Models\User;
use App\Models\VendorProfile;
use Database\Seeders\RoleAndPermissionSeeder;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Spatie\Permission\PermissionRegistrar;

abstract class TestCase extends BaseTestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(RoleAndPermissionSeeder::class);

        app(PermissionRegistrar::class)
            ->forgetCachedPermissions();
    }

    protected function authenticatedVendor(): User
    {
        $user = User::factory()->create(['role' => 'vendor']);
        $user->assignRole('vendor');
        $user->givePermissionTo('manage-own-products');

        VendorProfile::factory()->create(['user_id' => $user->id]);

        return $user;
    }

    protected function authenticatedCustomer(): User {
        $user = User::factory()->create(['role' => 'customer']);
        $user->assignRole('customer');
        return $user;
    }
}
