<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class JsonUnicode
{
    public function handle(Request $request, Closure $next): mixed
    {
        $response = $next($request);

        if ($response instanceof JsonResponse) {
            $response->setEncodingOptions($response->getEncodingOptions() | JSON_UNESCAPED_UNICODE);
        }

        return $response;
    }
}
