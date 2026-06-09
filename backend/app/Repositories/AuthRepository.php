<?php

namespace App\Repositories;

use App\Models\User;

class AuthRepository
{
    public function createUser(array $data) {
        return User::create($data);
    }
}
