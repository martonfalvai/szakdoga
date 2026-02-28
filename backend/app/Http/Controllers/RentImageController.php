<?php

namespace App\Http\Controllers;

use App\Models\Rent_image;
use Illuminate\Http\Request;

class RentImageController extends Controller
{
    public function index()
    {
        return response()->json(Rent_image::all());
    }

    public function show(Rent_image $rent_image)
    {
        return response()->json($rent_image);
    }

    public function destroy(Rent_image $rent_image)
    {
        $rent_image->delete();

        return response()->json(null, 204);
    }
}
