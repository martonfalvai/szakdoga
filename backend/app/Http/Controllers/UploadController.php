<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Rent;
use App\Models\Rent_image;
use Illuminate\Support\Facades\Log;


class UploadController extends Controller
{
    public function store(Request $request): JsonResponse
    {


        try {
            $request->validate([
                'rent_id' => 'required|exists:rents,id',
                'images' => 'required|array',
                'images.*' => 'required|image|mimes:jpeg,png,webp|max:10240',  // 10MB max, JPG/PNG/WebP only
                'default_image_index' => 'nullable|integer'
            ]);
        } catch (\Exception $e) {
            Log::error('Validáció sikertelen', ['error' => $e->getMessage()]);
            return response()->json(['message' => $e->getMessage()], 422);
        }

        $uploadedImages = [];

        foreach ($request->file('images') as $index => $file) {
            Log::info('Fájl feldolgozása', [
                'index' => $index,
                'name' => $file->getClientOriginalName(),
                'size' => $file->getSize(),
                'mime' => $file->getMimeType(),
                'valid' => $file->isValid(),
                'error' => $file->getError(),
            ]);

            if (!$file->isValid()) {
                Log::error('Fájl érvénytelen', ['error_code' => $file->getError()]);
                return response()->json(['message' => 'Fájl feltöltési hiba', 'error_code' => $file->getError()], 500);
            }

            $base64 = base64_encode(file_get_contents($file->getRealPath()));
            $mime = $file->getMimeType();

            $image = Rent_image::create([
                'rent_id' => $request->rent_id,
                'base64' => 'data:' . $mime . ';base64,' . $base64,
            ]);

            $uploadedImages[] = $image;
        }

        $defaultIndex = $request->input('default_image_index', 0);
        $defaultImage = $uploadedImages[$defaultIndex] ?? $uploadedImages[0];

        Rent::where('id', $request->rent_id)->update([
            'defaultimage' => $defaultImage->id
        ]);

        return response()->json([
            'message' => 'Sikeres feltöltés',
            'images' => $uploadedImages,
            'default_image_id' => $defaultImage->id
        ]);
    }
}
