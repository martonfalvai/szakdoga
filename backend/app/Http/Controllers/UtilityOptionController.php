<?php

namespace App\Http\Controllers;

use App\Models\Utility_option;
use Illuminate\Http\Request;

class UtilityOptionController extends Controller
{
    public function index()
    {
        return response()->json(Utility_option::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $option = Utility_option::create($validated);

        return response()->json($option, 201);
    }

    public function show(Utility_option $utility_option)
    {
        return response()->json($utility_option);
    }

    public function update(Request $request, Utility_option $utility_option)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $utility_option->update($validated);

        return response()->json($utility_option);
    }

    public function destroy(Utility_option $utility_option)
    {
        $utility_option->delete();

        return response()->json(null, 204);
    }
}
