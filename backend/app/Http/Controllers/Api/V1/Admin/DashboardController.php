<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Services\DashboardService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    use ApiResponse;

    protected DashboardService $dashboardService;

    /**
     * @param DashboardService $dashboardService
     */
    public function __construct(DashboardService $dashboardService)
    {
        $this->dashboardService = $dashboardService;
    }

    public function index(Request $request): JsonResponse {
        $result = $this->dashboardService->getAdminDashboard($request->query('range'));
        return $this->success($result, 'Admin dashboard retrieved successfully');
    }
}
