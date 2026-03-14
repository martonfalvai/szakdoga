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
            [
                'id'             => 4,
                'rating'         => 5,
                'renter_comment' => 'Tökéletes hely, nagyon tiszta és jól felszerelt. A tulajdonos segítőkész volt.',
                'owner_comment'  => 'Nagyszerű bérlők, minden rendben volt.',
                'created_at'     => now(),
            ],
            [
                'id'             => 5,
                'rating'         => 4,
                'renter_comment' => 'Jó ház, de a kert kicsit elhanyagolt volt. Különben megfelelő.',
                'owner_comment'  => 'Rendben volt a bérlés, de a kertet jobban kellett volna gondozni.',
                'created_at'     => now(),
            ],
            [
                'id'             => 6,
                'rating'         => 2,
                'renter_comment' => 'A garzon kicsi volt, és voltak problémák a vízvezetékkel.',
                'owner_comment'  => 'A bérlők panaszkodtak, de mindent megoldottunk.',
                'created_at'     => now(),
            ],
            [
                'id'             => 7,
                'rating'         => 4,
                'renter_comment' => 'Szép kilátás, jó lakás. Az ár megfelelő.',
                'owner_comment'  => 'Kedves család, jól bántak a lakással.',
                'created_at'     => now(),
            ],
            [
                'id'             => 8,
                'rating'         => 5,
                'renter_comment' => 'Ideális vidéki ház, nyugodt környezet.',
                'owner_comment'  => 'Tökéletes bérlők, ajánlom őket.',
                'created_at'     => now(),
            ],
            [
                'id'             => 9,
                'rating'         => 3,
                'renter_comment' => 'Kis stúdió, de drága. A hely jó.',
                'owner_comment'  => 'Diákok voltak, rendben tartották.',
                'created_at'     => now(),
            ],
            [
                'id'             => 10,
                'rating'         => 4,
                'renter_comment' => 'Luxus lakás, minden megvolt. Kicsit zajos volt.',
                'owner_comment'  => 'Gazdag bérlők, kifizették időben.',
                'created_at'     => now(),
            ],
            [
                'id'             => 11,
                'rating'         => 5,
                'renter_comment' => 'Régi ház, de szépen felújított. Szerettük.',
                'owner_comment'  => 'Kulturált emberek, öröm volt velük dolgozni.',
                'created_at'     => now(),
            ],
            [
                'id'             => 12,
                'rating'         => 3,
                'renter_comment' => 'Kompakt lakás, de a szomszédok hangosak voltak.',
                'owner_comment'  => 'Rendben volt, de panaszok voltak.',
                'created_at'     => now(),
            ],
            [
                'id'             => 13,
                'rating'         => 4,
                'renter_comment' => 'Egyedi lakás, érdekes volt. Jó helyen.',
                'owner_comment'  => 'Művészek voltak, kreatívak.',
                'created_at'     => now(),
            ],
            [
                'id'             => 14,
                'rating'         => 5,
                'renter_comment' => 'Kiváló garzon, minden tökéletes volt.',
                'owner_comment'  => 'Ideális bérlők.',
                'created_at'     => now(),
            ],
            [
                'id'             => 15,
                'rating'         => 4,
                'renter_comment' => 'Jó lakás, de a fűtés drága volt.',
                'owner_comment'  => 'Rendben volt a bérlés.',
                'created_at'     => now(),
            ],
        ]);
    }
}
