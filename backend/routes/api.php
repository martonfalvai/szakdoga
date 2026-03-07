<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\RentController;
use App\Http\Controllers\RentImageController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\Admin;

Route::get('/images', [RentImageController::class, 'index']);
Route::post('/upload', [UploadController::class, 'store']);
Route::get('/rents', [RentController::class, 'mainPageRents']);
Route::get('/rents/{id}', [RentController::class, 'show']);


Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum'])
    ->group(function () {
        Route::get('/user', function (Request $request) {
            return $request->user();
        });
        //Route::post('/upload', [UploadController::class, 'store']);
    });


Route::middleware(['auth:sanctum', Admin::class])
    ->group(function () {
        Route::get('/users', [UserController::class, 'index']);
    });

// Route::post('/upload', [UploadController::class, 'store']);


require __DIR__ . '/auth.php';
