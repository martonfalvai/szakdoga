<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CitySeeder extends Seeder
{
    public function run(): void
    {
        DB::table('cities')->insert([
            ['name' => 'Budapest',       'postcode' => 1000], // id: 1  (megye: Budapest, id=20)
            ['name' => 'Debrecen',       'postcode' => 4024], // id: 2  (megye: Hajdú-Bihar, id=8)
            ['name' => 'Miskolc',        'postcode' => 3525], // id: 3  (megye: Borsod-Abaúj-Zemplén, id=4)
            ['name' => 'Pécs',           'postcode' => 7621], // id: 4  (megye: Baranya, id=2)
            ['name' => 'Győr',           'postcode' => 9021], // id: 5  (megye: Győr-Moson-Sopron, id=7)
            ['name' => 'Nyíregyháza',    'postcode' => 4400], // id: 6  (megye: Szabolcs-Szatmár-Bereg, id=15)
            ['name' => 'Kecskemét',      'postcode' => 6000], // id: 7  (megye: Bács-Kiskun, id=1)
            ['name' => 'Székesfehérvár', 'postcode' => 8000], // id: 8  (megye: Fejér, id=6)
            ['name' => 'Szombathely',    'postcode' => 9700], // id: 9  (megye: Vas, id=17)
            ['name' => 'Sopron',         'postcode' => 9400], // id: 10 (megye: Győr-Moson-Sopron, id=7)
            ['name' => 'Eger',           'postcode' => 3300], // id: 11 (megye: Heves, id=9)
            ['name' => 'Veszprém',       'postcode' => 8200], // id: 12 (megye: Veszprém, id=18)
            ['name' => 'Zalaegerszeg',   'postcode' => 8900], // id: 13 (megye: Zala, id=19)
            ['name' => 'Kaposvár',       'postcode' => 7400], // id: 14 (megye: Somogy, id=14)
            ['name' => 'Szolnok',        'postcode' => 5000], // id: 15 (megye: Jász-Nagykun-Szolnok, id=10)
            ['name' => 'Tatabánya',      'postcode' => 2800], // id: 16 (megye: Komárom-Esztergom, id=11)
            ['name' => 'Szeged',         'postcode' => 6720], // id: 17 (megye: Csongrád-Csanád, id=5)
            ['name' => 'Érd',            'postcode' => 2030], // id: 18 (megye: Pest, id=13)
            ['name' => 'Nagykanizsa',    'postcode' => 8800], // id: 19 (megye: Zala, id=19)
            ['name' => 'Dunaújváros',    'postcode' => 2400], // id: 20 (megye: Fejér, id=6)
        ]);
    }
}
