<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RentingSeeder extends Seeder
{
    public function run(): void
    {
        // FK referenciák:
        //   rents_id -> rents.id   (1, 2, 3)
        //   renter   -> users.id   (2=Nagy Béla, 3=Szabó Anna)
        //   owner    -> users.id   (1=Kovács János)

        DB::table('rentings')->insert([
            // Rent 1
            [
                'rents_id'     => 1,
                'renter'       => 2,
                'owner'        => 1,
                'price'        => 180000,
                'rented_from'  => '2026-01-01',
                'rented_until' => '2026-03-31',
                'created_at'   => now(),
                'updated_at'   => now(),
            ],
            [
                'rents_id'     => 1,
                'renter'       => 3,
                'owner'        => 1,
                'price'        => 180000,
                'rented_from'  => '2025-10-01',
                'rented_until' => '2025-12-31',
                'created_at'   => now(),
                'updated_at'   => now(),
            ],
            [
                'rents_id'     => 1,
                'renter'       => 4,
                'owner'        => 1,
                'price'        => 180000,
                'rented_from'  => '2025-07-01',
                'rented_until' => '2025-09-30',
                'created_at'   => now(),
                'updated_at'   => now(),
            ],
            // Rent 2
            [
                'rents_id'     => 2,
                'renter'       => 3,
                'owner'        => 1,
                'price'        => 220000,
                'rented_from'  => '2026-02-01',
                'rented_until' => '2026-04-30',
                'created_at'   => now(),
                'updated_at'   => now(),
            ],
            [
                'rents_id'     => 2,
                'renter'       => 5,
                'owner'        => 1,
                'price'        => 220000,
                'rented_from'  => '2025-11-01',
                'rented_until' => '2026-01-31',
                'created_at'   => now(),
                'updated_at'   => now(),
            ],
            // Rent 3
            [
                'rents_id'     => 3,
                'renter'       => 2,
                'owner'        => 1,
                'price'        => 95000,
                'rented_from'  => '2025-12-01',
                'rented_until' => '2026-01-31',
                'created_at'   => now(),
                'updated_at'   => now(),
            ],
            [
                'rents_id'     => 3,
                'renter'       => 4,
                'owner'        => 1,
                'price'        => 95000,
                'rented_from'  => '2025-09-01',
                'rented_until' => '2025-11-30',
                'created_at'   => now(),
                'updated_at'   => now(),
            ],
            // Rent 4
            [
                'rents_id'     => 4,
                'renter'       => 5,
                'owner'        => 6,
                'price'        => 250000,
                'rented_from'  => '2026-01-01',
                'rented_until' => '2026-03-31',
                'created_at'   => now(),
                'updated_at'   => now(),
            ],
            [
                'rents_id'     => 4,
                'renter'       => 2,
                'owner'        => 6,
                'price'        => 250000,
                'rented_from'  => '2025-10-01',
                'rented_until' => '2025-12-31',
                'created_at'   => now(),
                'updated_at'   => now(),
            ],
            // Rent 5
            [
                'rents_id'     => 5,
                'renter'       => 3,
                'owner'        => 6,
                'price'        => 150000,
                'rented_from'  => '2025-12-01',
                'rented_until' => '2026-02-28',
                'created_at'   => now(),
                'updated_at'   => now(),
            ],
            // Rent 6
            [
                'rents_id'     => 6,
                'renter'       => 4,
                'owner'        => 6,
                'price'        => 70000,
                'rented_from'  => '2025-11-01',
                'rented_until' => '2026-01-31',
                'created_at'   => now(),
                'updated_at'   => now(),
            ],
            [
                'rents_id'     => 6,
                'renter'       => 5,
                'owner'        => 6,
                'price'        => 70000,
                'rented_from'  => '2025-08-01',
                'rented_until' => '2025-10-31',
                'created_at'   => now(),
                'updated_at'   => now(),
            ],
            // Rent 7
            [
                'rents_id'     => 7,
                'renter'       => 2,
                'owner'        => 1,
                'price'        => 400000,
                'rented_from'  => '2026-01-01',
                'rented_until' => '2026-03-31',
                'created_at'   => now(),
                'updated_at'   => now(),
            ],
            // Rent 8
            [
                'rents_id'     => 8,
                'renter'       => 3,
                'owner'        => 1,
                'price'        => 190000,
                'rented_from'  => '2025-12-01',
                'rented_until' => '2026-02-28',
                'created_at'   => now(),
                'updated_at'   => now(),
            ],
            // Rent 9
            [
                'rents_id'     => 9,
                'renter'       => 4,
                'owner'        => 6,
                'price'        => 85000,
                'rented_from'  => '2025-10-01',
                'rented_until' => '2025-12-31',
                'created_at'   => now(),
                'updated_at'   => now(),
            ],
            // Rent 10
            [
                'rents_id'     => 10,
                'renter'       => 5,
                'owner'        => 6,
                'price'        => 200000,
                'rented_from'  => '2025-11-01',
                'rented_until' => '2026-01-31',
                'created_at'   => now(),
                'updated_at'   => now(),
            ],
        ]);
    }
}
