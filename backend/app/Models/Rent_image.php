<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rent_image extends Model
{
    /** @use HasFactory<\Database\Factories\RentImageFactory> */
    use HasFactory;

    protected $fillable = [
        'rent_id',
        'url',
        
    ];
}
