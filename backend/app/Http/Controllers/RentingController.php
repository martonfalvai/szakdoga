<?php

namespace App\Http\Controllers;

use App\Models\Renting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RentingController extends Controller
{
    public function index()
    {
        $rentings = DB::table('rentings')
            ->select(
                'rentings.id',
                'rentings.rents_id',
                'rentings.renter',
                'rentings.owner',
                'renters.name as renter_name',
                'owners.name as owner_name',
                'rentings.price',
                'rentings.rented_from',
                'rentings.rented_until'
            )
            ->leftJoin('users as renters', 'rentings.renter', '=', 'renters.id')
            ->leftJoin('users as owners', 'rentings.owner', '=', 'owners.id')
            ->get();

        return response()->json($rentings);
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
