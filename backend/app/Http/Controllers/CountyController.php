<?php

namespace App\Http\Controllers;

use App\Models\County;
use Illuminate\Http\Request;

class CountyController extends Controller
{
    public function index()
    {
        return response()->json(County::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $county = County::create($validated);

        return response()->json($county, 201);
    }

    public function show(County $county)
    {
        return response()->json($county);
    }

    public function update(Request $request, County $county)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $county->update($validated);

        return response()->json($county);
    }

    public function destroy(County $county)
    {
        $county->delete();

        return response()->json(null, 204);
    }
}
