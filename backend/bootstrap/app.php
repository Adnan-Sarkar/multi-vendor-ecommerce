<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use \Symfony\Component\HttpFoundation\Response;
use \Spatie\Permission\Middleware\PermissionMiddleware;
use \Spatie\Permission\Middleware\RoleMiddleware;
use \Spatie\Permission\Middleware\RoleOrPermissionMiddleware;
use \Illuminate\Validation\ValidationException;
use \Illuminate\Database\Eloquent\ModelNotFoundException;
use \Illuminate\Auth\AuthenticationException;
use \Spatie\Permission\Exceptions\UnauthorizedException;
use \App\Exceptions\BaseException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'permission' => PermissionMiddleware::class,
            'role' => RoleMiddleware::class,
            'role_or_permission' => RoleOrPermissionMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*'),
        );

        $exceptions->render(function (\Throwable $e, Request $request) {
            if (!$request->is('api/*')) return null;

            // Validation errors
            if ($e instanceof ValidationException) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $e->errors(),
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            // Model not found
            if ($e instanceof ModelNotFoundException) {
                return response()->json([
                    'success' => false,
                    'message' => 'Resource not found',
                    'errors' => null,
                ], Response::HTTP_NOT_FOUND);
            }

            // Unauthorized
            if ($e instanceof AuthenticationException) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthenticated',
                    'errors' => null,
                ], Response::HTTP_UNAUTHORIZED);
            }

            // Spatie unauthorized
            if ($e instanceof UnauthorizedException) {
                return response()->json([
                    'success' => false,
                    'message' => 'You do not have permission to perform this action',
                    'errors' => null,
                ], Response::HTTP_FORBIDDEN);
            }

            // Custom exceptions
            if ($e instanceof BaseException) {
                return response()->json([
                    'success' => false,
                    'message' => $e->getMessage(),
                    'errors' => null,
                ], $e->getCode() ?: Response::HTTP_BAD_REQUEST);
            }

            // Generic server error
            return response()->json([
                'success' => false,
                'message' => app()->isProduction() ? 'Server error' : $e->getMessage(),
                'errors' => null,
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        });
    })->create();
