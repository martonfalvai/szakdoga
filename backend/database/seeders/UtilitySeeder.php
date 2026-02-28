<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UtilitySeeder extends Seeder
{
    public function run(): void
    {
        // FK referenciák:
        //   rent_id          -> rents.id            (1, 2, 3)
        //   utility_option_id -> utility_options.id
        //     1=WiFi, 2=Parkoló, 3=Légkondicionáló, 4=Erkély/Terasz
        //     5=Mosógép, 6=Mosogatógép, 7=Háziállatbarát, 8=Bútorozva
        //     9=Lift, 10=Kert, 11=Medence, 12=Pince/Tároló

        DB::table('utilities')->insert([
            // Rent 1 - Budapest lakás
            ['rent_id' => 1, 'utility_option_id' => 1],  // WiFi
            ['rent_id' => 1, 'utility_option_id' => 2],  // Parkoló
            ['rent_id' => 1, 'utility_option_id' => 3],  // Légkondicionáló
            ['rent_id' => 1, 'utility_option_id' => 4],  // Erkély/Terasz
            ['rent_id' => 1, 'utility_option_id' => 5],  // Mosógép
            ['rent_id' => 1, 'utility_option_id' => 8],  // Bútorozva
            ['rent_id' => 1, 'utility_option_id' => 9],  // Lift

            // Rent 2 - Debrecen ház
            ['rent_id' => 2, 'utility_option_id' => 1],  // WiFi
            ['rent_id' => 2, 'utility_option_id' => 2],  // Parkoló
            ['rent_id' => 2, 'utility_option_id' => 5],  // Mosógép
            ['rent_id' => 2, 'utility_option_id' => 6],  // Mosogatógép
            ['rent_id' => 2, 'utility_option_id' => 7],  // Háziállatbarát
            ['rent_id' => 2, 'utility_option_id' => 10], // Kert
            ['rent_id' => 2, 'utility_option_id' => 12], // Pince/Tároló

            // Rent 3 - Pécs garzon
            ['rent_id' => 3, 'utility_option_id' => 1],  // WiFi
            ['rent_id' => 3, 'utility_option_id' => 3],  // Légkondicionáló
            ['rent_id' => 3, 'utility_option_id' => 8],  // Bútorozva
        ]);
    }
}
