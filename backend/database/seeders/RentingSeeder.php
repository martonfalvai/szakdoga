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
                'rents_id'     => 3,
                'renter'       => 2,
                'owner'        => 1,
                'price'        => 95000,
                'rented_from'  => '2025-12-01',
                'rented_until' => '2026-01-31',
                'created_at'   => now(),
                'updated_at'   => now(),
            ],
        ]);
    }
}
