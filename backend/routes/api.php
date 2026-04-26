<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RentController;
use App\Http\Controllers\RentImageController;
use App\Http\Controllers\RentingController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\CountyController;
use App\Http\Controllers\RentTypeController;
use App\Http\Controllers\UtilityOptionController;
use App\Http\Controllers\ContactController;
use App\Http\Middleware\Admin;

// ─── PUBLIKUS ────────────────────────────────────────────────────────────────

Route::post('/contact', [ContactController::class, 'store']);

Route::get('/rents', [RentController::class, 'mainPageRents']);
Route::get('/rents/{id}', [RentController::class, 'show']);
Route::get('/rent-types', [RentTypeController::class, 'index']);
Route::get('/counties', [CountyController::class, 'index']);
Route::get('/cities', [CityController::class, 'index']);
Route::get('/utility-options', [UtilityOptionController::class, 'index']);

// ─── BEJELENTKEZETT USER ──────────────────────────────────────────────────────

Route::middleware(['auth:sanctum'])->group(function () {

    // Saját profil
    Route::get('/user', fn(Request $request) => $request->user());
    Route::put('/user', [UserController::class, 'updateSelf']);

    // Hirdetések
    Route::apiResource('rents', RentController::class)->only(['store', 'update', 'destroy']);
    Route::get('/user/rents', [RentController::class, 'myRents']);

    // Képfeltöltés
    Route::post('/upload', [UploadController::class, 'store']);
    Route::delete('/images/{rent_image}', [RentImageController::class, 'destroy']);

    // Bérlések
    Route::apiResource('rentings', RentingController::class)->only(['store', 'destroy']);
    Route::get('/user/rentings', [RentingController::class, 'myRentings']);
    Route::get('/user/ownerships', [RentingController::class, 'myOwnerships']);

    // Értékelések
    Route::apiResource('reviews', ReviewController::class)->only(['store', 'update', 'destroy']);

});

// ─── ADMIN ────────────────────────────────────────────────────────────────────

Route::middleware(['auth:sanctum', Admin::class])->prefix('admin')->group(function () {

    // Felhasználók
    Route::apiResource('users', UserController::class);

    // Hirdetések
    Route::patch('/rents/{rent}/highlight', [RentController::class, 'highlight']);
    Route::apiResource('rents', RentController::class)->only(['index', 'update', 'destroy']);

    // Bérlések
    Route::apiResource('rentings', RentingController::class)->only(['index', 'destroy']);

    // Értékelések
    Route::apiResource('reviews', ReviewController::class)->only(['index', 'destroy']);

    // Segédadatok kezelése
    Route::apiResource('counties', CountyController::class)->except(['index', 'show']);
    Route::apiResource('cities', CityController::class)->except(['index', 'show']);
    Route::apiResource('rent-types', RentTypeController::class)->except(['index', 'show']);
    Route::apiResource('utility-options', UtilityOptionController::class)->except(['index', 'show']);

});

require __DIR__ . '/auth.php';
