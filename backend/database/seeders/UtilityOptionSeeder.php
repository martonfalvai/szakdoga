<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UtilityOptionSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('utility_options')->insert([
            ['name' => 'WiFi'],               // id: 1
            ['name' => 'Parkoló'],            // id: 2
            ['name' => 'Légkondicionáló'],    // id: 3
            ['name' => 'Erkély/Terasz'],      // id: 4
            ['name' => 'Mosógép'],            // id: 5
            ['name' => 'Mosogatógép'],        // id: 6
            ['name' => 'Háziállatbarát'],     // id: 7
            ['name' => 'Bútorozva'],          // id: 8
            ['name' => 'Lift'],               // id: 9
            ['name' => 'Kert'],               // id: 10
            ['name' => 'Medence'],            // id: 11
            ['name' => 'Pince/Tároló'],       // id: 12
        ]);
    }
}
