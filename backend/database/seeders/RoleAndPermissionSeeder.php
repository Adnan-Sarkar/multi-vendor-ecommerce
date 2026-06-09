<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        $guard = 'api';

        // Creating roles
        $super_admin = Role::create([
            'name' => 'super_admin',
            'guard_name' => $guard,
        ]);

        $admin = Role::create([
            'name' => 'admin',
            'guard_name' => $guard,
        ]);

        $vendor = Role::create([
            'name' => 'vendor',
            'guard_name' => $guard,
        ]);

        $customer = Role::create([
            'name' => 'customer',
            'guard_name' => $guard,
        ]);

        // Creating permissions
        $permissions = [
            'manage-users',
            'manage-admins',
            'manage-vendors',
            'approve-vendor',
            'manage-categories',
            'manage-own-shop',
            'manage-own-products',
            'view-all-orders',
            'view-own-orders',
            'manage-coupons',
            'manage-withdrawals',
            'write-reviews',
            'manage-settings',
        ];

        foreach ($permissions as $permission) {
            Permission::create([
                'name' => $permission,
                'guard_name' => $guard,
            ]);
        }

        app(PermissionRegistrar::class)->forgetCachedPermissions();

        // Assign super admin with permissions
        $super_admin->givePermissionTo([
            'manage-users',
            'manage-admins',
            'manage-vendors',
            'approve-vendor',
            'manage-categories',
            'manage-own-shop',
            'manage-own-products',
            'view-all-orders',
            'view-own-orders',
            'manage-coupons',
            'manage-withdrawals',
            'write-reviews',
            'manage-settings',
        ]);

        // Assign admin with permissions
        $admin->givePermissionTo([
            'manage-users',
            'manage-vendors',
            'approve-vendor',
            'manage-categories',
            'manage-own-shop',
            'manage-own-products',
            'view-all-orders',
            'view-own-orders',
            'manage-coupons',
            'manage-withdrawals',
            'write-reviews',
            'manage-settings',
        ]);

        // Assign vendor with permissions
        $vendor->givePermissionTo([
            'manage-own-shop',
            'manage-own-products',
            'view-own-orders',
            'manage-coupons',
            'manage-withdrawals',
        ]);

        // Assign customer with permissions
        $customer->givePermissionTo([
            'view-own-orders',
            'write-reviews',
        ]);
    }
}
