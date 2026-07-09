<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\NotificationResource;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;

class NotificationController extends Controller
{
    use ApiResponse;

    public function index(): JsonResponse {
        $notifications = auth()->user()
            ->notifications()
            ->paginate(20);

        return $this->paginated(
            NotificationResource::collection($notifications),
            'Notifications retrieved successfully'
        );
    }

    public function unreadCount(): JsonResponse {
        $count = auth()->user()->unreadNotifications()->count();

        return $this->success(
            ['unread_count' => $count],
            'Unread count retrieved successfully'
        );
    }

    public function markAsRead(string $id): JsonResponse {
        auth()->user()
            ->notifications()
            ->where('id', $id)
            ->first()
            ?->markAsRead();

        return $this->success(null, 'Notification marked as read');
    }

    public function markAllAsRead(): JsonResponse {
        auth()->user()->unreadNotifications->markAsRead();

        return $this->success(null, 'All notifications marked as read');
    }
}
