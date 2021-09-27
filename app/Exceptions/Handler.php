<?php

namespace App\Exceptions;

use App\Http\Controllers\ApiController;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\UnauthorizedException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class Handler extends ExceptionHandler
{
    protected $dontReport = [
        //
    ];

    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    public function register()
    {
        $this->reportable(function (Throwable $e) {

        });
    }

    public function render($request, Throwable $exception)
    {
        if ($request->wantsJson()) {
            return $this->handleApiException($request, $exception);
        }

        return parent::render($request, $exception);
    }

    private function handleApiException($request, $exception)
    {
        switch (true) {
            case $exception instanceof UnauthorizedException:
            case $exception instanceof TokenInvalidException:
            case $exception instanceof TokenExpiredException:
            case $exception instanceof JWTException:
                return $this->responder([
                    'error' => true,
                    'message' => $exception->getMessage() ?: 'Unauthorized.',
                ], 401);
            case $exception instanceof QueryException:
                return $this->responder([
                    'error' => true,
                    'message' => 'Something went wrong..',
                ], 500);
            case $exception instanceof ValidationException:
                return $this->parseValidationErrorResponse($exception);
            case $exception instanceof ModelNotFoundException:
            case $exception instanceof NotFoundHttpException:
            case $exception instanceof MethodNotAllowedHttpException:
                return $this->responder([
                    'error' => true,
                    'message' => 'Resource not available.',
                ], 404);
            default:
                $data = [
                    'error' => true,
                    'message' => 'Something went wrong...',
                ];
                $statusCode = method_exists($exception, 'getStatusCode') ? $exception->getStatusCode() : 500;

                return $this->responder($data, $statusCode);
        }
    }

    private function responder($data, $statusCode, array $headers = [])
    {
        return app(ApiController::class)->respondError($data, $statusCode, $headers);
    }

    private function parseValidationErrorResponse(Throwable $exception)
    {
        $errors = [];
        $statusCode = 422;
        if ($exception instanceof ValidationException) {
            $errors = $exception->errors();
        }
        $chopped = [];
        foreach ($errors as $key => $error) {
            $chopped[$key] = $error[0];
        }

        return $this->responder(['error' => true, 'causes' => $chopped], $statusCode);
    }
}
