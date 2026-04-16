<?php

namespace Database\Factories;

use App\Models\Rent;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class RentingFactory extends Factory
{
    public function definition(): array
    {
        return [
            'rents_id'     => Rent::factory()->available(),
            'renter'       => User::factory(),
            'owner'        => User::factory(),
            'price'        => fake()->numberBetween(50000, 300000),
            'rented_from'  => fake()->dateTimeBetween('now', '+1 month')->format('Y-m-d'),
            'rented_until' => fake()->dateTimeBetween('+2 months', '+6 months')->format('Y-m-d'),
        ];
    }
}
