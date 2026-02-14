<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rent_type extends Model
{
    /** @use HasFactory<\Database\Factories\RentTypeFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        
    ];
}
