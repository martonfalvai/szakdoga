<?php

namespace Tests\Feature;

use App\Models\Rent;
use App\Models\Renting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RentingTest extends TestCase
{
    use RefreshDatabase;

    public function test_bejelentkezett_user_berlest_indithat(): void
    {
        $renter = User::factory()->create();
        $owner  = User::factory()->create();
        $rent   = Rent::factory()->available()->create();

        $response = $this->actingAs($renter)->postJson('/api/rentings', [
            'rents_id'     => $rent->id,
            'renter'       => $renter->id,
            'owner'        => $owner->id,
            'price'        => 120000,
            'rented_from'  => now()->addDays(5)->toDateString(),
            'rented_until' => now()->addDays(35)->toDateString(),
        ]);

        $response->assertCreated();
        $this->assertDatabaseHas('rentings', ['rents_id' => $rent->id]);
    }

    public function test_vendeg_nem_indithat_berlest(): void
    {
        $rent = Rent::factory()->available()->create();

        $this->postJson('/api/rentings', [
            'rents_id'     => $rent->id,
            'renter'       => 1,
            'owner'        => 2,
            'price'        => 100000,
            'rented_from'  => now()->addDays(5)->toDateString(),
            'rented_until' => now()->addDays(35)->toDateString(),
        ])->assertUnauthorized();
    }

    public function test_berlest_vegdatum_nem_lehet_korabbi_a_kezdetnel(): void
    {
        $renter = User::factory()->create();
        $owner  = User::factory()->create();
        $rent   = Rent::factory()->available()->create();

        $this->actingAs($renter)->postJson('/api/rentings', [
            'rents_id'     => $rent->id,
            'renter'       => $renter->id,
            'owner'        => $owner->id,
            'price'        => 100000,
            'rented_from'  => now()->addDays(10)->toDateString(),
            'rented_until' => now()->addDays(3)->toDateString(), // korábbi mint from
        ])->assertUnprocessable();
    }

    public function test_bejelentkezett_user_torolheti_berleset(): void
    {
        $user    = User::factory()->create();
        $renting = Renting::factory()->create();

        $this->actingAs($user)
             ->deleteJson("/api/rentings/{$renting->id}")
             ->assertNoContent();

        $this->assertDatabaseMissing('rentings', ['id' => $renting->id]);
    }
}
