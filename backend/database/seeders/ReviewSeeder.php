<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReviewSeeder extends Seeder
{
    public function run(): void
    {
        // FK referencia:
        //   id -> rentings.id (1, 2, 3) - 1:1 kapcsolat

        DB::table('reviews')->insert([
            [
                'id'             => 1,
                'rating'         => 5,
                'renter_comment' => 'Kiváló lakás, pontosan olyan volt mint a hirdetésben. Mindent megkaptunk ami kellett.',
                'owner_comment'  => 'Megbízható, precíz bérlő. Bármikor szívesen fogadom újra.',
                'created_at'     => now(),
            ],
            [
                'id'             => 2,
                'rating'         => 4,
                'renter_comment' => 'Szép, tágas ház, a kert gondozott volt. Kis késéssel kaptuk meg a kulcsokat.',
                'owner_comment'  => 'Gondos bérlők, rendben hagyták a házat. Ajánlom őket.',
                'created_at'     => now(),
            ],
            [
                'id'             => 3,
                'rating'         => 3,
                'renter_comment' => 'Megfelelő garzon, de a légkondi nem működött megfelelően az első héten.',
                'owner_comment'  => 'A bérlés rendben ment, a lakást tisztán adták vissza.',
                'created_at'     => now(),
            ],
        ]);
    }
}
