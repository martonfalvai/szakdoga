<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // --- Felhasználók ---
        // role: 0 = admin, 1 = felhasználó
        DB::table('users')->insert([
            [
                'name'     => 'Kovács János',
                'email'    => 'kovacs.janos@example.com',
                'role'     => 0,
                'password' => Hash::make('password'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'     => 'Nagy Béla',
                'email'    => 'nagy.bela@example.com',
                'role'     => 1,
                'password' => Hash::make('password'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'     => 'Szabó Anna',
                'email'    => 'szabo.anna@example.com',
                'role'     => 1,
                'password' => Hash::make('password'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'     => 'Tóth István',
                'email'    => 'toth.istvan@example.com',
                'role'     => 1,
                'password' => Hash::make('password'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'     => 'Kiss Mária',
                'email'    => 'kiss.maria@example.com',
                'role'     => 1,
                'password' => Hash::make('password'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name'     => 'Varga László',
                'email'    => 'varga.laszlo@example.com',
                'role'     => 0,
                'password' => Hash::make('password'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // --- Referencia seeders (helyes sorrendben a FK-k miatt) ---
        $this->call([
            CountySeeder::class,
            CitySeeder::class,
            RentTypeSeeder::class,
            UtilityOptionSeeder::class,
            RentSeeder::class,
            RentImageSeeder::class,
            UtilitySeeder::class,
            RentingSeeder::class,
            ReviewSeeder::class,
        ]);
    }
}
