<?php

namespace App\Models;

use Database\Factories\RentTypeFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rent_type extends Model
{
    /** @use HasFactory<\Database\Factories\RentTypeFactory> */
    use HasFactory;

    protected static function newFactory(): RentTypeFactory
    {
        return RentTypeFactory::new();
    }

    public $timestamps = false;

    protected $fillable = [
        'name',
        
    ];
}
