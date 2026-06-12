<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;

trait ApiResponse
{
    public function success($data, $message = 'Success', $code = 200): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data,
        ], $code);
    }

    public function error($message = 'Error', $code = 400): JsonResponse
    {
        $code = ($code && $code >= 100 && $code <= 599) ? $code : 400;

        return response()->json([
            'success' => false,
            'message' => $message,
            'data' => null,
        ], $code);
    }

    public function paginated($resource, $message = 'Success', $code = 200): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $resource->collection,
            'meta' => [
                'current_page' => $resource->currentPage(),
                'per_page' => $resource->perPage(),
                'total' => $resource->total(),
                'last_page' => $resource->lastPage(),
                'from' => $resource->firstItem(),
                'to' => $resource->lastItem(),
            ],
            'links' => [
                'first' => $resource->url(1),
                'last' => $resource->url($resource->lastPage()),
                'next' => $resource->nextPageUrl(),
                'prev' => $resource->previousPageUrl(),
            ]
        ], $code);
    }
}
