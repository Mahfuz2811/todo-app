<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use App\Models\User;

class AuthController extends ApiController
{
    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = $request->only('email', 'password');
        if (!$token = auth()->attempt($credentials)) {
            return $this->respondError([
                'error' => true,
                'message' => 'Invalid username or password.',
            ], 401);
        }

        return $this->createNewToken($token);
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        $userData = $request->only([
            'name',
            'email',
            'password'
        ]);

        $userData['email_verified_at'] = Carbon::now();

        $user = User::create($userData);

        return $this->respondSuccess([
            'message' => 'User successfully registered',
            'user' => $user
        ], 201);
    }

    public function logout(): JsonResponse
    {
        auth()->logout();

        return $this->respondSuccess([
            'message' => 'User successfully signed out'
        ]);
    }

    public function refresh(): JsonResponse
    {
        return $this->createNewToken(auth()->refresh());
    }

    protected function createNewToken($token): JsonResponse
    {
        return $this->respondSuccess([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }
}
