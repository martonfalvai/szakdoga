<?php

namespace Tests\Feature;

use App\Models\City;
use App\Models\County;
use App\Models\Rent;
use App\Models\Rent_type;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RentTest extends TestCase
{
    use RefreshDatabase;

    // ── Hirdetések listázása ────────────────────────────────────────────────

    public function test_hirdetesek_listazasa_publikusan_elerheto(): void
    {
        Rent::factory()->count(3)->create();

        $response = $this->getJson('/api/rents');

        $response->assertOk()
                 ->assertJsonCount(3);
    }

    public function test_szures_varos_szerint(): void
    {
        $city = City::factory()->create(['name' => 'Budapest']);
        Rent::factory()->create(['city' => $city->id, 'status' => 'available']);
        Rent::factory()->count(2)->create(); // más városok

        $response = $this->getJson('/api/rents?city=Budapest');

        $response->assertOk()
                 ->assertJsonCount(1)
                 ->assertJsonFragment(['city' => 'Budapest']);
    }

    public function test_szures_ar_szerint(): void
    {
        Rent::factory()->create(['price' => 100000, 'status' => 'available']);
        Rent::factory()->create(['price' => 300000, 'status' => 'available']);
        Rent::factory()->create(['price' => 500000, 'status' => 'available']);

        $response = $this->getJson('/api/rents?price_min=200000&price_max=400000');

        $response->assertOk()
                 ->assertJsonCount(1)
                 ->assertJsonFragment(['price' => 300000]);
    }

    public function test_kiemelt_hirdetes_elore_kerul(): void
    {
        Rent::factory()->count(3)->create(['highlighted' => null]);
        Rent::factory()->create(['highlighted' => now()]);

        $response = $this->getJson('/api/rents');

        $rents = $response->json();
        $this->assertNotNull($rents[0]['highlighted']);
    }

    // ── Hirdetés részletei ──────────────────────────────────────────────────

    public function test_hirdetes_reszletei_visszaadja_az_adatokat(): void
    {
        $rent = Rent::factory()->create();

        $response = $this->getJson("/api/rents/{$rent->id}");

        $response->assertOk()
                 ->assertJsonStructure([
                     'id', 'title', 'description', 'price', 'currency',
                     'city', 'address', 'area', 'bedrooms', 'bathrooms',
                     'status', 'available_from', 'images', 'utilities',
                     'reviews', 'average_rating',
                 ]);
    }

    public function test_nem_letezo_hirdetes_404_hibat_ad(): void
    {
        $this->getJson('/api/rents/9999')
             ->assertNotFound();
    }

    // ── Hirdetés létrehozása (auth szükséges) ───────────────────────────────

    public function test_bejelentkezett_user_feladhat_hirdetest(): void
    {
        $user     = User::factory()->create();
        $county   = County::factory()->create();
        $city     = City::factory()->create();
        $rentType = Rent_type::factory()->create();

        $response = $this->actingAs($user)->postJson('/api/rents', [
            'rent_type'      => $rentType->id,
            'title'          => 'Teszt lakás',
            'description'    => 'Szép lakás a belvárosban.',
            'price'          => 150000,
            'currency'       => 'HUF',
            'county'         => $county->id,
            'city'           => $city->id,
            'address'        => 'Fő utca 1.',
            'area'           => 55,
            'bedrooms'       => 2,
            'bathrooms'      => 1,
            'status'         => 'available',
            'available_from' => now()->addDays(7)->toDateString(),
        ]);

        $response->assertCreated()
                 ->assertJsonFragment(['title' => 'Teszt lakás']);

        $this->assertDatabaseHas('rents', ['title' => 'Teszt lakás']);
    }

    public function test_vendeg_nem_adhat_fel_hirdetest(): void
    {
        $this->postJson('/api/rents', [])
             ->assertUnauthorized();
    }

    // ── Hirdetés törlése ────────────────────────────────────────────────────

    public function test_bejelentkezett_user_torölheti_hirdeteset(): void
    {
        $user = User::factory()->create();
        $rent = Rent::factory()->create();

        $this->actingAs($user)
             ->deleteJson("/api/rents/{$rent->id}")
             ->assertNoContent();

        $this->assertDatabaseMissing('rents', ['id' => $rent->id]);
    }
}
