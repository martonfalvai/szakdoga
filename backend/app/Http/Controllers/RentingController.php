<?php

namespace App\Http\Controllers;

use App\Models\Renting;
use Illuminate\Http\Request;

class RentingController extends Controller
{
    public function index()
    {
        return response()->json(Renting::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'rents_id'     => 'required|integer|exists:rents,id',
            'renter'       => 'required|integer|exists:users,id',
            'owner'        => 'required|integer|exists:users,id',
            'price'        => 'required|numeric',
            'rented_from'  => 'required|date',
            'rented_until' => 'required|date|after:rented_from',
        ]);

        $renting = Renting::create($validated);

        return response()->json($renting, 201);
    }

    public function show(Renting $renting)
    {
        return response()->json($renting);
    }

    public function update(Request $request, Renting $renting)
    {
        $validated = $request->validate([
            'price'        => 'sometimes|numeric',
            'rented_from'  => 'sometimes|date',
            'rented_until' => 'sometimes|date|after:rented_from',
        ]);

        $renting->update($validated);

        return response()->json($renting);
    }

    public function destroy(Renting $renting)
    {
        $renting->delete();

        return response()->json(null, 204);
    }
}
