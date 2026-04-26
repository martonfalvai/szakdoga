<?php

namespace App\Http\Controllers;

use App\Models\Rent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RentController extends Controller
{
    public function index()
    {
        return response()->json(Rent::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'owner_id'       => 'required|integer|exists:users,id',
            'rent_type'      => 'required|integer|exists:rent_types,id',
            'title'          => 'required|string|max:255',
            'description'    => 'required|string',
            'price'          => 'required|numeric',
            'currency'       => 'required|string|max:10',
            'county'         => 'required|integer|exists:counties,id',
            'city'           => 'required|integer|exists:cities,id',
            'address'        => 'required|string|max:255',
            'area'           => 'nullable|numeric',
            'bedrooms'       => 'required|integer',
            'bathrooms'      => 'required|integer',
            'status'         => 'required|string|in:available,rented,draft,unavailable',
            'available_from' => 'required|date',
            'highlighted'    => 'nullable|date',
            'utility_ids'    => 'nullable|array',
            'utility_ids.*'  => 'integer|exists:utility_options,id',
        ]);

        $rent = Rent::create($validated);

        if ($request->has('utility_ids') && !empty($validated['utility_ids'])) {
            foreach ($validated['utility_ids'] as $utilityId) {
                DB::table('utilities')->insert([
                    'rent_id' => $rent->id,
                    'utility_option_id' => $utilityId,
                ]);
            }
        }

        return response()->json($rent, 201);
    }

    public function show(Request $request, $id)
    {
        $rent = Rent::select([
            'rents.*',
            'cities.name as city_name',
            'default_img.base64 as defaultimage'
        ])
            ->leftJoin('cities', 'rents.city', '=', 'cities.id')
            ->leftJoin('rent_images as default_img', 'rents.defaultimage', '=', 'default_img.id')
            ->where('rents.id', $id)
            ->first();

        if (!$rent) {
            return response()->json(['message' => 'Rent not found'], 404);
        }

        // Összes kép lekérése ehhez a rent-hez
        $images = DB::table('rent_images')
            ->select('id', 'base64')
            ->where('rent_id', $id)
            ->get();

        // Utilities lekérése
        $utilities = DB::table('utilities')
            ->select('utilities.id', 'utility_options.name')
            ->join('utility_options', 'utilities.utility_option_id', '=', 'utility_options.id')
            ->where('utilities.rent_id', $id)
            ->get();

        // Reviews lekérése
        $reviews = DB::table('reviews')
            ->select(
                'reviews.rating',
                'reviews.renter_comment',
                'reviews.owner_comment',
                'reviews.created_at',
                'renter.name as renter_name',
                'owner.name as owner_name'
            )
            ->join('rentings', 'reviews.id', '=', 'rentings.id')
            ->join('users as renter', 'rentings.renter', '=', 'renter.id')
            ->join('users as owner', 'rentings.owner', '=', 'owner.id')
            ->where('rentings.rents_id', $id)
            ->get();

        // Átlagos rating számítása
        $averageRating = $reviews->avg('rating') ?? 0;

        // Response összeállítása
        $response = [
            'id' => $rent->id,
            'title' => $rent->title,
            'description' => $rent->description,
            'price' => $rent->price,
            'currency' => $rent->currency,
            'city' => $rent->city_name,
            'address' => $rent->address,
            'area' => $rent->area,
            'bedrooms' => $rent->bedrooms,
            'bathrooms' => $rent->bathrooms,
            'status' => $rent->status,
            'available_from' => $rent->available_from,
            'highlighted' => $rent->highlighted,
            'defaultimage' => $rent->defaultimage,
            'owner_id' => $rent->owner_id,
            'images' => $images,
            'utilities' => $utilities,
            'reviews' => $reviews,
            'average_rating' => $averageRating

        ];

        return response()->json($response);
    }

    public function update(Request $request, Rent $rent)
    {
        $user = $request->user();

        if (!$user || ($user->id !== $rent->owner_id && $user->role !== 0)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

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
            'status'         => 'sometimes|string|in:available,rented,draft,unavailable',
            'available_from' => 'sometimes|date',
            'highlighted'    => 'nullable|date',
            'utility_ids'    => 'nullable|array',
            'utility_ids.*'  => 'integer|exists:utility_options,id',
        ]);

        // Utility opciók frissítése
        if ($request->has('utility_ids')) {
            DB::table('utilities')->where('rent_id', $rent->id)->delete();

            if (!empty($validated['utility_ids'])) {
                foreach ($validated['utility_ids'] as $utilityId) {
                    DB::table('utilities')->insert([
                        'rent_id' => $rent->id,
                        'utility_option_id' => $utilityId,
                    ]);
                }
            }
        }

        // utility_ids-t nem mentjük a rent record-hoz
        unset($validated['utility_ids']);

        $rent->update($validated);

        return response()->json($rent);
    }

    public function highlight(Rent $rent)
    {
        $rent->highlighted = $rent->highlighted ? null : now();
        $rent->save();

        return response()->json(['highlighted' => $rent->highlighted]);
    }

    public function destroy(Request $request, Rent $rent)
    {
        $user = $request->user();

        if (!$user || ($user->id !== $rent->owner_id && $user->role !== 0)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $rent->delete();

        return response()->json(null, 204);
    }

    public function mainPageRents(Request $request)
    {
        $query = Rent::select([
            'rents.id',
            'rents.title',
            'rents.highlighted',
            'rents.price',
            'rents.currency',
            'cities.name as city',
            'rents.available_from',
            'rent_images.base64',
            'rents.bedrooms',
            'rents.bathrooms',
            'rents.area',
            'rents.status',
        ])
            ->selectRaw('COALESCE(AVG(reviews.rating), 0) as rating')
            ->leftJoin('rent_images', 'rents.defaultimage', '=', 'rent_images.id')
            ->leftJoin('cities', 'rents.city', '=', 'cities.id')
            ->leftJoin('counties', 'rents.county', '=', 'counties.id')
            ->leftJoin('rentings', 'rents.id', '=', 'rentings.rents_id')
            ->leftJoin('reviews', 'rentings.id', '=', 'reviews.id')
            ->where('rents.status', 'available');

        if ($request->filled('city')) {
            $query->where('cities.name', 'like', '%' . $request->city . '%');
        }

        if ($request->filled('county')) {
            $query->where('counties.name', $request->county);
        }

        if ($request->filled('price_min')) {
            $query->where('rents.price', '>=', $request->price_min);
        }

        if ($request->filled('price_max')) {
            $query->where('rents.price', '<=', $request->price_max);
        }

        if ($request->filled('area_min')) {
            $query->where('rents.area', '>=', $request->area_min);
        }

        if ($request->filled('area_max')) {
            $query->where('rents.area', '<=', $request->area_max);
        }

        if ($request->filled('bedrooms')) {
            $query->where('rents.bedrooms', '>=', $request->bedrooms);
        }

        if ($request->filled('bathrooms')) {
            $query->where('rents.bathrooms', '>=', $request->bathrooms);
        }

        if ($request->filled('status')) {
            $query->where('rents.status', $request->status);
        }

        if ($request->filled('available_from')) {
            $query->where('rents.available_from', '<=', $request->available_from);
        }

        $rents = $query->groupBy([
            'rents.id',
            'rents.title',
            'rents.highlighted',
            'rents.price',
            'rents.currency',
            'cities.name',
            'rents.available_from',
            'rent_images.base64',
            'rents.bedrooms',
            'rents.bathrooms',
            'rents.area',
            'rents.status',
        ])
            ->orderByRaw('CASE WHEN rents.highlighted IS NOT NULL THEN 0 ELSE 1 END')
            ->orderBy('rents.highlighted', 'desc')
            ->get()
            ->map(function ($rent) {
                return [
                    'id' => $rent->id,
                    'title' => $rent->title,
                    'highlighted' => $rent->highlighted,
                    'price' => $rent->price,
                    'currency' => $rent->currency,
                    'city' => $rent->city,
                    'available_from' => $rent->available_from,
                    'defaultimage' => $rent->base64,
                    'rating' => round((float) $rent->rating, 1),
                ];
            });

        return response()->json($rents);
    }

    public function highlight(Rent $rent)
    {
        $rent->update(['highlighted' => now()]);
        return response()->json([
            'message' => 'Hirdetés kiemelve',
            'rent' => $rent,
        ]);
    }
}
