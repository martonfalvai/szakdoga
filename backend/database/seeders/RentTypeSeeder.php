<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RentTypeSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('rent_types')->insert([
            ['name' => 'Lakás'],    // id: 1
            ['name' => 'Ház'],      // id: 2
            ['name' => 'Garzon'],   // id: 3
            ['name' => 'Nyaraló'], // id: 4
            ['name' => 'Iroda'],   // id: 5
        ]);
    }
}
