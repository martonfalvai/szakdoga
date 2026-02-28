<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RentImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Placeholder képek base64 formátumban (SVG képek)
        // Rent 1 - Budapest lakás (kék árnyalatú képek)
        $budapestImage1 = "data:image/svg+xml;base64," . base64_encode('<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="600" fill="#4A90E2"/><text x="50%" y="45%" font-size="32" fill="white" text-anchor="middle" font-family="Arial">Budapest Lakás</text><text x="50%" y="55%" font-size="24" fill="white" text-anchor="middle" font-family="Arial">Nappali</text></svg>');

        $budapestImage2 = "data:image/svg+xml;base64," . base64_encode('<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="600" fill="#5BA3F5"/><text x="50%" y="45%" font-size="32" fill="white" text-anchor="middle" font-family="Arial">Budapest Lakás</text><text x="50%" y="55%" font-size="24" fill="white" text-anchor="middle" font-family="Arial">Konyha</text></svg>');

        $budapestImage3 = "data:image/svg+xml;base64," . base64_encode('<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="600" fill="#3D7BC7"/><text x="50%" y="45%" font-size="32" fill="white" text-anchor="middle" font-family="Arial">Budapest Lakás</text><text x="50%" y="55%" font-size="24" fill="white" text-anchor="middle" font-family="Arial">Hálószoba</text></svg>');

        // Rent 2 - Debrecen ház (zöld árnyalatú képek)
        $debrecenImage1 = "data:image/svg+xml;base64," . base64_encode('<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="600" fill="#50C878"/><text x="50%" y="45%" font-size="32" fill="white" text-anchor="middle" font-family="Arial">Debrecen Családi Ház</text><text x="50%" y="55%" font-size="24" fill="white" text-anchor="middle" font-family="Arial">Kert</text></svg>');

        $debrecenImage2 = "data:image/svg+xml;base64," . base64_encode('<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="600" fill="#6FD98D"/><text x="50%" y="45%" font-size="32" fill="white" text-anchor="middle" font-family="Arial">Debrecen Családi Ház</text><text x="50%" y="55%" font-size="24" fill="white" text-anchor="middle" font-family="Arial">Kültér</text></svg>');

        $debrecenImage3 = "data:image/svg+xml;base64," . base64_encode('<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="600" fill="#3EAF5E"/><text x="50%" y="45%" font-size="32" fill="white" text-anchor="middle" font-family="Arial">Debrecen Családi Ház</text><text x="50%" y="55%" font-size="24" fill="white" text-anchor="middle" font-family="Arial">Nappali</text></svg>');

        // Rent 3 - Pécs garzon (narancssárga árnyalatú képek)
        $pecsImage1 = "data:image/svg+xml;base64," . base64_encode('<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="600" fill="#FF8C42"/><text x="50%" y="45%" font-size="32" fill="white" text-anchor="middle" font-family="Arial">Pécs Garzon</text><text x="50%" y="55%" font-size="24" fill="white" text-anchor="middle" font-family="Arial">Nappali/Hálószoba</text></svg>');

        $pecsImage2 = "data:image/svg+xml;base64," . base64_encode('<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="600" fill="#FFA05C"/><text x="50%" y="45%" font-size="32" fill="white" text-anchor="middle" font-family="Arial">Pécs Garzon</text><text x="50%" y="55%" font-size="24" fill="white" text-anchor="middle" font-family="Arial">Konyhasarok</text></svg>');

        DB::table('rent_images')->insert([
            // Budapest lakás képei (rent_id: 1)
            [
                'rent_id'    => 1,
                'base64'     => $budapestImage1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'rent_id'    => 1,
                'base64'     => $budapestImage2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'rent_id'    => 1,
                'base64'     => $budapestImage3,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Debrecen ház képei (rent_id: 2)
            [
                'rent_id'    => 2,
                'base64'     => $debrecenImage1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'rent_id'    => 2,
                'base64'     => $debrecenImage2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'rent_id'    => 2,
                'base64'     => $debrecenImage3,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Pécs garzon képei (rent_id: 3)
            [
                'rent_id'    => 3,
                'base64'     => $pecsImage1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'rent_id'    => 3,
                'base64'     => $pecsImage2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // Frissítsd a rents táblát, hogy beállítsd a defaultimage-t
        DB::table('rents')->where('id', 1)->update(['defaultimage' => 1]);
        DB::table('rents')->where('id', 2)->update(['defaultimage' => 4]);
        DB::table('rents')->where('id', 3)->update(['defaultimage' => 7]);
    }
}
