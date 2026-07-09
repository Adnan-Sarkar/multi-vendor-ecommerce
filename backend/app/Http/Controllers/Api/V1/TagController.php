<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\TagResource;
use App\Models\Tag;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TagController extends Controller
{
    use ApiResponse;

    public function index(): JsonResponse {
        $tags = Tag::all();

        return $this->success(
            TagResource::collection($tags),
            'Tags retrieved successfully'
        );
    }

    public function store(Request $request): JsonResponse {
        $request->validate([
            'name' => 'required|string|unique:product_tags,name',
        ]);

        $tag = Tag::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
        ]);

        return $this->success($tag, 'Tag created successfully', 201);
    }

    public function destroy(Tag $tag): JsonResponse {
        $tag->delete();

        return $this->success(null, 'Tag deleted successfully');
    }
}
