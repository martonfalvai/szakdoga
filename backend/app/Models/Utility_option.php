<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Utility_option extends Model
{
    /** @use HasFactory<\Database\Factories\UtilityOptionFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
    ];
}
