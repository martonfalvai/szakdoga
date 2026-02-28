<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CountySeeder extends Seeder
{
    public function run(): void
    {
        DB::table('counties')->insert([
            ['name' => 'Bács-Kiskun'],            // id: 1
            ['name' => 'Baranya'],                 // id: 2
            ['name' => 'Békés'],                   // id: 3
            ['name' => 'Borsod-Abaúj-Zemplén'],   // id: 4
            ['name' => 'Csongrád-Csanád'],         // id: 5
            ['name' => 'Fejér'],                   // id: 6
            ['name' => 'Győr-Moson-Sopron'],       // id: 7
            ['name' => 'Hajdú-Bihar'],             // id: 8
            ['name' => 'Heves'],                   // id: 9
            ['name' => 'Jász-Nagykun-Szolnok'],   // id: 10
            ['name' => 'Komárom-Esztergom'],       // id: 11
            ['name' => 'Nógrád'],                  // id: 12
            ['name' => 'Pest'],                    // id: 13
            ['name' => 'Somogy'],                  // id: 14
            ['name' => 'Szabolcs-Szatmár-Bereg'], // id: 15
            ['name' => 'Tolna'],                   // id: 16
            ['name' => 'Vas'],                     // id: 17
            ['name' => 'Veszprém'],                // id: 18
            ['name' => 'Zala'],                    // id: 19
            ['name' => 'Budapest'],                // id: 20
        ]);
    }
}
