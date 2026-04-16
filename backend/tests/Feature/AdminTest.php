<?php

namespace Tests\Feature;

use App\Models\Rent;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AdminTest extends TestCase
{
    use RefreshDatabase;

    private const ADMIN_RENTS_URL = '/api/admin/rents';

    // ── Jogosultság ellenőrzés ──────────────────────────────────────────────

    public function test_admin_nelkul_nem_erheto_el_az_admin_vegpont(): void
    {
        Sanctum::actingAs(User::factory()->create()); // role = 0 (sima user)

        $this->getJson(self::ADMIN_RENTS_URL)
             ->assertForbidden();
    }

    public function test_vendeg_nem_erheti_el_az_admin_vegpontot(): void
    {
        $this->getJson(self::ADMIN_RENTS_URL)
             ->assertUnauthorized();
    }

    // ── Hirdetés kiemelés toggle ────────────────────────────────────────────

    public function test_admin_ki_tudja_emelni_a_hirdetest(): void
    {
        Sanctum::actingAs(User::factory()->admin()->create());
        $rent = Rent::factory()->create(['highlighted' => null]);

        $response = $this->patchJson("/api/admin/rents/{$rent->id}/highlight");

        $response->assertOk();
        $this->assertNotNull($response->json('highlighted'));
        $this->assertDatabaseMissing('rents', ['id' => $rent->id, 'highlighted' => null]);
    }

    public function test_admin_el_tudja_tavolitani_a_kiemelest(): void
    {
        Sanctum::actingAs(User::factory()->admin()->create());
        $rent = Rent::factory()->highlighted()->create();

        $response = $this->patchJson("/api/admin/rents/{$rent->id}/highlight");

        $response->assertOk()
                 ->assertJson(['highlighted' => null]);
    }

    // ── Hirdetések és felhasználók kezelése ─────────────────────────────────

    public function test_admin_listazza_az_osszes_hirdetest(): void
    {
        Sanctum::actingAs(User::factory()->admin()->create());
        Rent::factory()->count(5)->create();

        $this->getJson(self::ADMIN_RENTS_URL)
             ->assertOk()
             ->assertJsonCount(5);
    }

    public function test_admin_torolhet_hirdetest(): void
    {
        Sanctum::actingAs(User::factory()->admin()->create());
        $rent = Rent::factory()->create();

        $this->deleteJson("/api/admin/rents/{$rent->id}")
             ->assertNoContent();

        $this->assertDatabaseMissing('rents', ['id' => $rent->id]);
    }

    public function test_admin_listazza_a_felhasznalokat(): void
    {
        Sanctum::actingAs(User::factory()->admin()->create());
        User::factory()->count(3)->create();

        $this->getJson('/api/admin/users')
             ->assertOk()
             ->assertJsonCount(5); // 3 regular + 1 admin (teszt) + 1 migration-ból
    }
}
