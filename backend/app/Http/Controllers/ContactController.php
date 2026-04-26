<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'nullable|string|max:20',
            'message' => 'required|string|max:500',
        ]);

        \Log::info('Contact form submitted', $validated);

        return response()->json([
            'message' => 'Üzenet sikeresen elküldve!',
            'status' => 'success',
        ]);
    }
}
