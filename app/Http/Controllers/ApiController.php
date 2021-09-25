<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

class ApiController extends Controller
{
    public function respondSuccess($data, $statusCode = 200, array $headers = []): JsonResponse
    {
        return response()->json($data, $statusCode, $headers);
    }

    public function respondError($data, $statusCode = 400, array $headers = []): JsonResponse
    {
        return response()->json($data, $statusCode, $headers);
    }
}
