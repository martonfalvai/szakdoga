<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class ProfileTest extends TestCase
{
    use RefreshDatabase;

    public function test_bejelentkezett_user_lekerheti_a_profiljat(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
             ->getJson('/api/user')
             ->assertOk()
             ->assertJsonFragment(['email' => $user->email]);
    }

    public function test_user_megvaltoztathatja_a_nevet(): void
    {
        $user = User::factory()->create(['name' => 'Régi Név']);

        $response = $this->actingAs($user)
                         ->putJson('/api/user', ['name' => 'Új Név']);

        $response->assertOk()
                 ->assertJsonFragment(['name' => 'Új Név']);

        $this->assertDatabaseHas('users', ['id' => $user->id, 'name' => 'Új Név']);
    }

    public function test_user_megvaltoztathatja_a_jelszot(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->putJson('/api/user', [
            'password'              => 'ujjelszo123',
            'password_confirmation' => 'ujjelszo123',
        ])->assertOk();

        $this->assertTrue(Hash::check('ujjelszo123', $user->fresh()->password));
    }

    public function test_jelszovaltashoz_megerositesz_kell(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->putJson('/api/user', [
            'password'              => 'ujjelszo123',
            'password_confirmation' => 'masikjelszo', // nem egyezik
        ])->assertUnprocessable();
    }

    public function test_vendeg_nem_erheti_el_a_profilt(): void
    {
        $this->getJson('/api/user')
             ->assertUnauthorized();
    }
}
