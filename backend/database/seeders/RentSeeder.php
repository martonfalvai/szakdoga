<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RentSeeder extends Seeder
{
    public function run(): void
    {
        // FK referenciák:
        //   rent_type -> rent_types.id  (1=Lakás, 2=Ház, 3=Garzon)
        //   county    -> counties.id    (20=Budapest, 8=Hajdú-Bihar, 2=Baranya)
        //   city      -> cities.id      (1=Budapest, 2=Debrecen, 4=Pécs)

        DB::table('rents')->insert([
            [
                'rent_type'      => 1,
                'title'          => 'Felújított lakás a belvárosban',
                'highlighted'    => null,
                'description'    => 'Elegáns, teljesen felújított 2 szobás lakás Budapest szívében. Közel a metróhoz és a főbb bevásárlóközpontokhoz. Berendezett, azonnal beköltözhető.',
                'price'          => 180000,
                'currency'       => 'HUF',
                'county'         => 20,
                'city'           => 1,
                'address'        => 'Váci utca 12. II/4.',
                'area'           => 58.5,
                'bedrooms'       => 2,
                'bathrooms'      => 1,
                'status'         => 'available',
                'defaultimage'   => null,
                'available_from' => '2026-03-01 00:00:00',
                'created_at'     => now(),
                'updated_at'     => now(),
            ],
            [
                'rent_type'      => 2,
                'title'          => 'Csendes családi ház kerttel',
                'highlighted'    => now(),
                'description'    => 'Debrecen egyik nyugodt utcájában kiadó tágas, 4 szobás családi ház. Nagy kert, dupla garázs, állatbarát környezet. Iskolák és óvoda 5 perc sétára.',
                'price'          => 220000,
                'currency'       => 'HUF',
                'county'         => 8,
                'city'           => 2,
                'address'        => 'Arany János utca 45.',
                'area'           => 120.0,
                'bedrooms'       => 4,
                'bathrooms'      => 2,
                'status'        => 'available',
                'defaultimage'   => null,
                'available_from' => '2026-02-15 00:00:00',
                'created_at'     => now(),
                'updated_at'     => now(),
            ],
            [
                'rent_type'      => 3,
                'title'          => 'Modern garzon a városközpontban',
                'highlighted'    => null,
                'description'    => 'Pécs belvárosában kiadó modern garzonlakás. Teljesen bútorozott, légkondicionált. Ideális egy főre vagy párnak. Közel az egyetemhez.',
                'price'          => 95000,
                'currency'       => 'HUF',
                'county'         => 2,
                'city'           => 4,
                'address'        => 'Király utca 8. I/2.',
                'area'           => 32.0,
                'bedrooms'       => 1,
                'bathrooms'      => 1,
                'status'         => 'rented',
                'defaultimage'   => null,
                'available_from' => '2026-04-01 00:00:00',
                'created_at'     => now(),
                'updated_at'     => now(),
            ],
        ]);
    }
}
