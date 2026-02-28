<?php

namespace App\Http\Controllers;

use App\Models\Rent;
use Illuminate\Http\Request;

class RentController extends Controller
{
    public function index()
    {


        return response()->json(Rent::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'rent_type'      => 'required|integer|exists:rent_types,id',
            'title'          => 'required|string|max:255',
            'description'    => 'required|string',
            'price'          => 'required|numeric',
            'currency'       => 'required|string|max:10',
            'county'         => 'required|integer|exists:counties,id',
            'city'           => 'required|integer|exists:cities,id',
            'address'        => 'required|string|max:255',
            'area'           => 'required|numeric',
            'bedrooms'       => 'required|integer',
            'bathrooms'      => 'required|integer',
            'status'         => 'required|string|in:available,rented,inactive',
            'available_from' => 'required|date',
            'highlighted'    => 'nullable|date',
        ]);

        $rent = Rent::create($validated);

        return response()->json($rent, 201);
    }

    public function show(Rent $rent)
    {
        $filtered = Rent::select([
            'id',
            'title',
            'highlighted',
            'price',
            'currency',
            'city',
            'available_from'
        ])->find($rent->id);

        return response()->json($filtered);
    }

    public function update(Request $request, Rent $rent)
    {
        $validated = $request->validate([
            'rent_type'      => 'sometimes|integer|exists:rent_types,id',
            'title'          => 'sometimes|string|max:255',
            'description'    => 'sometimes|string',
            'price'          => 'sometimes|numeric',
            'currency'       => 'sometimes|string|max:10',
            'county'         => 'sometimes|integer|exists:counties,id',
            'city'           => 'sometimes|integer|exists:cities,id',
            'address'        => 'sometimes|string|max:255',
            'area'           => 'sometimes|numeric',
            'bedrooms'       => 'sometimes|integer',
            'bathrooms'      => 'sometimes|integer',
            'status'         => 'sometimes|string|in:available,rented,inactive',
            'available_from' => 'sometimes|date',
            'highlighted'    => 'nullable|date',
        ]);

        $rent->update($validated);

        return response()->json($rent);
    }

    public function destroy(Rent $rent)
    {
        $rent->delete();

        return response()->json(null, 204);
    }

    public function mainPageRents()
    {
        $rents = Rent::select([
            'id',
            'title',
            'highlighted',
            'price',
            'currency',
            'city',
            'available_from'
        ])->get();

        return response()->json($rents);
    }
}
