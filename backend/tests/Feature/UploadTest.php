<?php

namespace Tests\Feature;

use App\Models\Rent;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class UploadTest extends TestCase
{
    use RefreshDatabase;

    private const UPLOAD_URL = '/api/upload';

    // ── Sikeres képfeltöltés ────────────────────────────────────────────────

    public function test_bejelentkezett_user_fel_tud_tolteni_kepet(): void
    {
        Sanctum::actingAs(User::factory()->create());
        $rent = Rent::factory()->create();

        $image = UploadedFile::fake()->image('test.jpg', 640, 480);

        $response = $this->postJson(self::UPLOAD_URL, [
            'rent_id' => $rent->id,
            'images' => [$image],
        ]);

        $response->assertOk()
                 ->assertJsonStructure([
                     'message',
                     'images' => [
                         '*' => ['id', 'rent_id', 'base64']
                     ],
                     'default_image_id'
                 ]);

        $this->assertDatabaseHas('rent_images', ['rent_id' => $rent->id]);
    }

    public function test_tobb_kep_feltoltese(): void
    {
        Sanctum::actingAs(User::factory()->create());
        $rent = Rent::factory()->create();

        $images = [
            UploadedFile::fake()->image('image1.jpg'),
            UploadedFile::fake()->image('image2.png'),
            UploadedFile::fake()->image('image3.webp'),
        ];

        $response = $this->postJson(self::UPLOAD_URL, [
            'rent_id' => $rent->id,
            'images' => $images,
        ]);

        $response->assertOk()
                 ->assertJsonCount(3, 'images');

        $this->assertEquals(3, \App\Models\Rent_image::where('rent_id', $rent->id)->count());
    }

    public function test_default_kep_beallitasa(): void
    {
        Sanctum::actingAs(User::factory()->create());
        $rent = Rent::factory()->create();

        $images = [
            UploadedFile::fake()->image('image1.jpg'),
            UploadedFile::fake()->image('image2.jpg'),
        ];

        $response = $this->postJson(self::UPLOAD_URL, [
            'rent_id' => $rent->id,
            'images' => $images,
            'default_image_index' => 1,
        ]);

        $response->assertOk();

        $defaultImageId = $response->json('default_image_id');
        $rent->refresh();

        $this->assertEquals($defaultImageId, $rent->defaultimage);
    }

    // ── Érvényesítés hibák ──────────────────────────────────────────────────

    public function test_hianyzo_rent_id(): void
    {
        Sanctum::actingAs(User::factory()->create());
        $image = UploadedFile::fake()->image('test.jpg');

        $response = $this->postJson(self::UPLOAD_URL, [
            'images' => [$image],
        ]);

        $response->assertUnprocessable();
    }

    public function test_ervenytelen_rent_id(): void
    {
        Sanctum::actingAs(User::factory()->create());
        $image = UploadedFile::fake()->image('test.jpg');

        $response = $this->postJson(self::UPLOAD_URL, [
            'rent_id' => 9999,
            'images' => [$image],
        ]);

        $response->assertUnprocessable();
    }

    public function test_hianyzo_images_array(): void
    {
        Sanctum::actingAs(User::factory()->create());
        $rent = Rent::factory()->create();

        $response = $this->postJson(self::UPLOAD_URL, [
            'rent_id' => $rent->id,
        ]);

        $response->assertUnprocessable();
    }

    // ── Fájl típus ellenőrzés ───────────────────────────────────────────────

    public function test_csak_jpg_png_webp_engedelyezett(): void
    {
        Sanctum::actingAs(User::factory()->create());
        $rent = Rent::factory()->create();

        // PDF fájl helyett próbálunk képet feltölteni
        $invalidFile = UploadedFile::fake()->create('document.pdf', 100, 'application/pdf');

        $response = $this->postJson(self::UPLOAD_URL, [
            'rent_id' => $rent->id,
            'images' => [$invalidFile],
        ]);

        $response->assertUnprocessable();
    }

    // ── Fájl méret ellenőrzés ────────────────────────────────────────────────

    public function test_max_10mb_fajlmeret(): void
    {
        Sanctum::actingAs(User::factory()->create());
        $rent = Rent::factory()->create();

        // 11MB fájl (túl nagy)
        $largeFile = UploadedFile::fake()->image('large.jpg')->size(11 * 1024); // ~11MB

        $response = $this->postJson(self::UPLOAD_URL, [
            'rent_id' => $rent->id,
            'images' => [$largeFile],
        ]);

        $response->assertUnprocessable();
    }

    // ── Autentikáció ellenőrzés ─────────────────────────────────────────────

    public function test_vendeg_nem_tud_kepet_felolteni(): void
    {
        $rent = Rent::factory()->create();
        $image = UploadedFile::fake()->image('test.jpg');

        $response = $this->postJson(self::UPLOAD_URL, [
            'rent_id' => $rent->id,
            'images' => [$image],
        ]);

        $response->assertUnauthorized();
    }
}
