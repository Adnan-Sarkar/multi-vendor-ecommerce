<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'name' => 'Super Admin',
            'email' => 'admin@gmail.com',
            'password' => 'password123',
            'role' => 'super_admin',
            'is_active' => true,
            'phone' => '01700000000',
        ]);

        $user->assignRole('super_admin');
    }
}
