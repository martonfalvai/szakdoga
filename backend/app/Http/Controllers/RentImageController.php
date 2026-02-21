<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRent_imageRequest;
use App\Http\Requests\UpdateRent_imageRequest;
use App\Models\Rent_image;

class RentImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Rent_image::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRent_imageRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Rent_image $rent_image)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRent_imageRequest $request, Rent_image $rent_image)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Rent_image $rent_image)
    {
        //
    }
}
