<?php

namespace Tests\Feature;

use App\Models\Renting;
use App\Models\Review;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ReviewTest extends TestCase
{
    use RefreshDatabase;

    private const REVIEWS_URL = '/api/reviews';

    public function test_bejelentkezett_user_ertekeleszt_irhat(): void
    {
        Sanctum::actingAs(User::factory()->create());
        $renting = Renting::factory()->create();

        $response = $this->postJson(self::REVIEWS_URL, [
            'id'             => $renting->id,
            'rating'         => 5,
            'renter_comment' => 'Nagyon szép lakás volt!',
            'owner_comment'  => 'Kiváló bérlő.',
        ]);

        $response->assertCreated();
        $this->assertDatabaseHas('reviews', ['id' => $renting->id, 'rating' => 5]);
    }

    public function test_vendeg_nem_irhat_ertekeleszt(): void
    {
        $renting = Renting::factory()->create();

        $this->postJson(self::REVIEWS_URL, [
            'id'             => $renting->id,
            'rating'         => 4,
            'renter_comment' => 'Ok.',
            'owner_comment'  => 'Ok.',
        ])->assertUnauthorized();
    }

    public function test_rating_csak_1_es_5_kozott_fogadható_el(): void
    {
        Sanctum::actingAs(User::factory()->create());
        $renting = Renting::factory()->create();

        $this->postJson(self::REVIEWS_URL, [
            'id'             => $renting->id,
            'rating'         => 6,
            'renter_comment' => 'Teszt.',
            'owner_comment'  => 'Teszt.',
        ])->assertUnprocessable();
    }

    public function test_ertekeles_torolheto(): void
    {
        Sanctum::actingAs(User::factory()->create());
        $review = Review::factory()->create();

        $this->deleteJson(self::REVIEWS_URL . "/{$review->id}")
             ->assertNoContent();

        $this->assertDatabaseMissing('reviews', ['id' => $review->id]);
    }
}
