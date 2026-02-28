<?php

namespace App\Http\Controllers;

use App\Models\Rent_type;
use Illuminate\Http\Request;

class RentTypeController extends Controller
{
    public function index()
    {
        return response()->json(Rent_type::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $rentType = Rent_type::create($validated);

        return response()->json($rentType, 201);
    }

    public function show(Rent_type $rent_type)
    {
        return response()->json($rent_type);
    }

    public function update(Request $request, Rent_type $rent_type)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $rent_type->update($validated);

        return response()->json($rent_type);
    }

    public function destroy(Rent_type $rent_type)
    {
        $rent_type->delete();

        return response()->json(null, 204);
    }
}
