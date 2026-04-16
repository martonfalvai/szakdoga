<?php

namespace Database\Factories;

use App\Models\City;
use App\Models\County;
use App\Models\Rent_type;
use Illuminate\Database\Eloquent\Factories\Factory;

class RentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'rent_type'      => Rent_type::factory(),
            'title'          => fake()->sentence(3),
            'description'    => fake()->paragraph(),
            'price'          => fake()->numberBetween(50000, 500000),
            'currency'       => 'HUF',
            'county'         => County::factory(),
            'city'           => City::factory(),
            'address'        => fake()->streetAddress(),
            'area'           => fake()->numberBetween(20, 200),
            'bedrooms'       => fake()->numberBetween(1, 5),
            'bathrooms'      => fake()->numberBetween(1, 3),
            'status'         => fake()->randomElement(['available', 'rented', 'inactive']),
            'available_from' => fake()->dateTimeBetween('now', '+6 months'),
            'highlighted'    => null,
            'defaultimage'   => null,
        ];
    }

    public function available(): static
    {
        return $this->state(fn() => ['status' => 'available']);
    }

    public function highlighted(): static
    {
        return $this->state(fn() => ['highlighted' => now()]);
    }
}
