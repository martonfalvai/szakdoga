<?php

namespace Database\Factories;

use App\Models\Rent_type;
use Illuminate\Database\Eloquent\Factories\Factory;

class RentTypeFactory extends Factory
{
    protected $model = Rent_type::class;

    public function definition(): array
    {
        return [
            'name' => fake()->randomElement(['Lakás', 'Ház', 'Garzon', 'Nyaraló', 'Iroda']),
        ];
    }
}
