<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index()
    {
        return response()->json(Review::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id'             => 'required|integer|exists:rentings,id|unique:reviews,id',
            'rating'         => 'required|integer|min:1|max:5',
            'renter_comment' => 'required|string|max:255',
            'owner_comment'  => 'required|string|max:255',
        ]);

        $review = Review::create($validated);

        return response()->json($review, 201);
    }

    public function show(Review $review)
    {
        return response()->json($review);
    }

    public function update(Request $request, Review $review)
    {
        $validated = $request->validate([
            'rating'         => 'sometimes|integer|min:1|max:5',
            'renter_comment' => 'sometimes|string|max:255',
            'owner_comment'  => 'sometimes|string|max:255',
        ]);

        $review->update($validated);

        return response()->json($review);
    }

    public function destroy(Review $review)
    {
        $review->delete();

        return response()->json(null, 204);
    }
}
