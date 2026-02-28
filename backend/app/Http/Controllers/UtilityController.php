<?php

namespace App\Http\Controllers;

use App\Models\Utility;
use Illuminate\Http\Request;

class UtilityController extends Controller
{
    public function index()
    {
        return response()->json(Utility::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'rent_id'           => 'required|integer|exists:rents,id',
            'utility_option_id' => 'required|integer|exists:utility_options,id',
        ]);

        $utility = Utility::create($validated);

        return response()->json($utility, 201);
    }

    public function show(Utility $utility)
    {
        return response()->json($utility);
    }

    public function destroy(Utility $utility)
    {
        $utility->delete();

        return response()->json(null, 204);
    }
}
