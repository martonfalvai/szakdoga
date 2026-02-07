<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUtilityRequest;
use App\Http\Requests\UpdateUtilityRequest;
use App\Models\Utility;

class UtilityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUtilityRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Utility $utility)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUtilityRequest $request, Utility $utility)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Utility $utility)
    {
        //
    }
}
