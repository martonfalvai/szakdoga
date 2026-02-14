<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Renting extends Model
{
    /** @use HasFactory<\Database\Factories\RentingFactory> */
    use HasFactory;

    protected $fillable = [
        'rents_id',
        'renter',
        'owner',
        'price',
        'rented_form',
        'rented_until'
    ];
}
