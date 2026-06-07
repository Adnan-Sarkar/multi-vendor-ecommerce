<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, HasRoles;

    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar',
        'is_active',
        'phone',
        'email_verified_at',
        'role'
    ];

    protected $hidden = [
        'password', 'remember_token'
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_active' => 'boolean'
        ];
    }

    public function vendorProfile() {
        return $this->hasOne(VendorProfile::class);
    }

    public function customerProfile() {
        return $this->hasOne(CustomerProfile::class);
    }

    public function addresses() {
        return $this->hasMany(Address::class);
    }

    public function orders() {
        return $this->hasMany(Order::class);
    }

    public function reviews() {
        return $this->hasMany(Review::class);
    }

    public function cart() {
        return $this->hasOne(Cart::class);
    }

    public function wishlists() {
        return $this->hasMany(Wishlist::class);
    }
}
