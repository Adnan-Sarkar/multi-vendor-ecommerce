<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $attributes = [
        'is_default' => false
    ];

    protected $fillable = [
        'user_id',
        'name',
        'phone',
        'address_line_1',
        'address_line_2',
        'city',
        'state',
        'zip_code',
        'is_default',
        'type',
    ];

    protected function casts(): array
    {
        return [
            'is_default' => 'boolean'
        ];
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
