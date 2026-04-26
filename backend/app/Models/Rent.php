<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rent extends Model
{
    /** @use HasFactory<\Database\Factories\RentFactory> */
    use HasFactory;

    protected $fillable = [
        'owner_id',
        'rent_type',
        'title',
        'highlighted',
        'description',
        'price',
        'currency',
        'county',
        'city',
        'address',
        'area',
        'bedrooms',
        'bathrooms',
        'status',
        'default_image',
        'available_from'

    ];
}
