<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'api', 'prefix' => 'v1'], function ($router) {
    Route::group(['prefix' => 'auth'], function ($router) {
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/register', [AuthController::class, 'register']);
        Route::group(['middleware' => 'auth.jwt'], function ($router) {
            Route::post('/logout', [AuthController::class, 'logout']);
            Route::post('/refresh', [AuthController::class, 'refresh']);
        });
    });

    Route::group(['middleware' => 'auth.jwt'], function ($router) {
        Route::get('tasks', [TaskController::class, 'index']);
        Route::group(['prefix' => 'task'], function ($router) {
            Route::post('/store', [TaskController::class, 'store']);
            Route::post('/save', [TaskController::class, 'saveTask']);
            Route::get('/{id}', [TaskController::class, 'show']);
            Route::put('/{id}', [TaskController::class, 'update']);
            Route::delete('/{id}', [TaskController::class, 'destroy']);
        });
    });
});
