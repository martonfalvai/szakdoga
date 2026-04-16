<?php

namespace Database\Factories;

use App\Models\Renting;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReviewFactory extends Factory
{
    public function definition(): array
    {
        return [
            'id'             => Renting::factory(),
            'rating'         => fake()->numberBetween(1, 5),
            'renter_comment' => fake()->sentence(),
            'owner_comment'  => fake()->sentence(),
        ];
    }
}
