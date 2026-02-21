<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rent_image extends Model
{
    /** @use HasFactory<\Database\Factories\RentImageFactory> */
    use HasFactory;

    // DISPLAY IMAGE: <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA..." alt="Embedded Logo">

    protected $fillable = ['rent_id', 'base64'];
}
